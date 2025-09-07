"use client";

import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useModal } from "@/contexts/Modal";
import { Fira_Mono } from "next/font/google";
// import { postNewContract } from "@/pages/api/firebase/about";

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
];

export default function HireMeForm() {
  const [formState, setFormState] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [selections, setSelections] = useState({
    skill: "",
    email: "",
    message: { messageSubject: "", messageBody: "" },
  });

  function formQuestion(state: number) {
    switch (state) {
      case 0:
        return "Hire Me For?";
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
              backgroundColor:
                selections.skill === s ? "burlywood" : "aliceblue",
              borderRadius: "7px",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: firaMono.style.fontFamily,
              textAlign: "center",
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
            sx={{ marginBottom: "10px" }}
          />
        );
      case 2:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
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
              label="Subject (Optional)"
              fullWidth
            />
            <TextField
              multiline
              rows={5}
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
              label="Message Body (Optional)"
              fullWidth
            />
          </div>
        );
      default:
        return null;
    }
  }

  function handleSubmit(state: number) {
    if (state < 2) {
      setFormState((prev) => prev + 1);
      setShowBtn(false);
    } else if (state === 2) {
      submit();
    }
  }

  async function submit() {
    setShowBtn(false);
    // await postNewContract(selections);
    setFormState(3);
    setTimeout(() => {
      // setFormState(0);
      setSelections({
        skill: "",
        email: "",
        message: { messageSubject: "", messageBody: "" },
      });
    }, 2000);
  }

  useEffect(() => {
    if (formState === 1) {
      const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        selections.email
      );
      setShowBtn(valid);
    }
    if (formState === 2) setShowBtn(true);
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
      {formOptions(formState)}

      {showBtn && formState < 3 && (
        <button
          onClick={() => handleSubmit(formState)}
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: "burlywood",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "goldenrod")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "burlywood")
          }
        >
          {formState === 2 ? "SUBMIT" : "NEXT"}
        </button>
      )}
    </div>
  );
}

export function HireMe() {
  const { openModal } = useModal();
  function handleClick() {
    openModal(<HireMeForm />);
  }
  return (
    <Button
      sx={{
        cursor: "pointer",
        mt: 2,
        height: "40px",
        width: "100px",
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
      Hire Me
    </Button>
  );
}
