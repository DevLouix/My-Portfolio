"use client";

import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useModal } from "@/contexts/Modal";
import { Fira_Mono } from "next/font/google";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

const skills = [
  "Web Development",
  "App Development",
  "Software Development",
  "3D Animation",
  "3D Modelling",
  "Game Development",
  "Others"
];

export default function ContactMeForm() {
  const [formState, setFormState] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [selections, setSelections] = useState({
    skill: "",
    email: "",
    message: { messageSubject: "", messageBody: "" },
  });
  const [submitting, setSubmitting] = useState(false);

  // Helper to get error message from Axios error
  const getErrorMessage = (error: any) => {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message || "Network error occurred";
    }
    return "An unexpected error occurred";
  };

  function formQuestion(state: number) {
    switch (state) {
      case 0:
        return "Select Category?";
      case 1:
        return "Email Address?";
      case 2:
        return "Message (if any)";
      case 3:
        return "Thanks for contacting me!";
      default:
        return "";
    }
  }

  function formOptions(state: number) {
    switch (state) {
      case 0:
        return skills.map((s) => (
          <div
            key={s}
            onClick={() => {
              setSelections({ ...selections, skill: s });
              setShowBtn(true);
            }}
            style={{
              // width: "max-content",
              backgroundColor:
                selections.skill === s ? "burlywood" : "aliceblue",
              borderRadius: "7px",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: firaMono.style.fontFamily,
              textAlign: "center",
              border: selections.skill === s ? "2px solid goldenrod" : "none" // Added subtle visual feedback
            }}
          >
            {s}
          </div>
        ));
      case 1:
        return (
          <TextField
            onChange={(e) =>
              setSelections({ ...selections, email: e.target.value })
            }
            value={selections.email}
            label="Email Address"
            type="email"
            name="email"
            fullWidth
            required
            error={!showBtn && selections.email.length > 0} // Visual error state
            sx={{ marginBottom: "10px" }}
          />
        );
      case 2:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              required
              onChange={(e) =>
                setSelections({
                  ...selections,
                  message: {
                    ...selections.message,
                    messageSubject: e.target.value,
                  },
                })
              }
              value={selections.message.messageSubject}
              label="Subject"
              fullWidth
            />
            <TextField
              required
              multiline
              rows={7}
              onChange={(e) =>
                setSelections({
                  ...selections,
                  message: {
                    ...selections.message,
                    messageBody: e.target.value,
                  },
                })
              }
              value={selections.message.messageBody}
              label="Message Body"
              fullWidth
            />
          </div>
        );
      case 3:
        // Added a visual confirmation block for state 3 so the user sees the result
        return (
          <div style={{ textAlign: "center", padding: "20px", color: "green" }}>
            <p>Your message has been sent successfully.</p>
          </div>
        );
      default:
        return null;
    }
  }

  function handleSubmit(state: number) {
    // Strict validation before moving to next step
    if (state === 0 && !selections.skill) {
      notifications.show({ title: "Error", message: "Please select a skill category.", color: "red" });
      return;
    }

    if (state === 1 && !showBtn) {
      notifications.show({ title: "Error", message: "Please enter a valid email.", color: "red" });
      return;
    }

    if (state < 2) {
      setFormState((prev) => prev + 1);
      setShowBtn(false); // Reset button visibility for next step
    } else if (state === 2) {
      submit();
    }
  }

  async function submit() {
    // 1. Strict Validation
    if (!selections.skill) {
      notifications.show({ title: "Validation Error", message: "Skill category is missing.", color: "red" });
      setFormState(0);
      return;
    }
    if (!selections.email) {
      notifications.show({ title: "Validation Error", message: "Email is missing.", color: "red" });
      setFormState(1);
      return;
    }
    if (!selections.message.messageBody || !selections.message.messageSubject) {
      notifications.show({
        title: "Validation Error",
        message: "Subject and Message Body are required.",
        color: "red",
      });
      return;
    }

    if (selections.message.messageBody.length < 10 || selections.message.messageSubject.length < 5) {
      notifications.show({
        title: "Validation Error",
        message: "Subject Characters must be greater than 5, Message Body Characters must be greater than 10.",
        color: "red",
      });
      return;
    }

    try {
      setShowBtn(false);
      setSubmitting(true);

      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      if (!serverUrl) {
        throw new Error("Server URL configuration is missing");
      }

      // Flatten the object for the API call if necessary, or send as is based on your backend expectation
      // Assumed payload structure based on your original code
      const payload = {
        requestCategory: selections.skill,
        clientEmail: selections.email,
        messageSubject: selections.message.messageSubject,
        messageBody: selections.message.messageBody
      };
      console.log(payload);
      

      await axios.post(`${serverUrl}/leads`, payload);

      // 2. Handle Success
      notifications.show({
        title: "Request Submitted!",
        message: "You'll get a response shortly.",
        color: "green",
      });

      // Move to success screen
      setFormState(3);

      // FIX: Removed the immediate reset to formState(0). 
      // If we reset immediately, the user never sees the "Thanks" screen.
      // We clear the data, but leave the user on the success screen.
      setSelections({
        skill: "",
        email: "",
        message: { messageSubject: "", messageBody: "" },
      });

    } catch (e: any) {
      // 3. Strict Error Handling
      const msg = getErrorMessage(e);
      console.error("Submission Error:", e);

      notifications.show({
        title: "Submission Failed",
        message: msg,
        color: "red",
      });

      // On error, show the button again so they can retry
      setShowBtn(true);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    // Validation for Step 1 (Email)
    if (formState === 1) {
      const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        selections.email
      );
      setShowBtn(valid);
    }

    // Validation for Step 2 (Message) - Ensure button shows up
    if (formState === 2) {
      // Only show button if fields are filled (Optional strictness, can revert to always true if preferred)
      const hasContent = selections.message.messageSubject.length > 0 && selections.message.messageBody.length > 0;
      setShowBtn(true); // Keeping your original logic of always showing, validation happens on click
    }
  }, [selections, formState]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        maxWidth: "400px",
        margin: "auto",
        color: "black",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
        {formQuestion(formState)}
      </div>

      {/* Container for options */}
      <div style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {formOptions(formState)}
      </div>

      {showBtn && formState < 3 && (
        <button
          disabled={submitting}
          onClick={() => handleSubmit(formState)}
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: submitting ? "wheat" : "burlywood",
            padding: "10px 20px",
            cursor: submitting ? "not-allowed" : "pointer",
            fontWeight: "bold",
            marginTop: "10px"
          }}
          onMouseOver={(e) => {
            if (!submitting) e.currentTarget.style.backgroundColor = "goldenrod";
          }}
          onMouseOut={(e) => {
            if (!submitting) e.currentTarget.style.backgroundColor = "burlywood";
          }}
        >
          {formState === 2 && submitting
            ? "SUBMITTING..."
            : formState === 2
              ? "SUBMIT"
              : "NEXT"}
        </button>
      )}

      {/* Optional: Add a button to reset properly after success */}
      {formState === 3 && (
        <button
          onClick={() => setFormState(0)}
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: "burlywood",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          SEND ANOTHER
        </button>
      )}
    </div>
  );
}

export function ContactMe() {
  const { openModal } = useModal();
  function handleClick() {
    openModal(<ContactMeForm />);
  }
  return (
    <Button
      sx={{
        cursor: "pointer",
        mt: 2,
        height: "40px",
        width: "150px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "yellow",
        color: "rgb(54, 47, 47)",
        "&:hover": {
          backgroundColor: "goldenrod",
        },
      }}
      onClick={handleClick}
    >
      Contact Me
    </Button>
  );
}