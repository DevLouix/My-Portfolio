import React from 'react'
import Image from 'next/image'
import { CMSLink } from '@/components/ui/CMSLink'
// 1. Import the specific icons from Tabler
import { 
  IconBrandTwitter, 
  IconBrandLinkedin, 
  IconBrandGithub, 
  IconBrandYoutube, 
  IconWorld 
} from '@tabler/icons-react'

// 2. Map the Payload database string to the React Icon
const iconMap = {
  twitter: <IconBrandTwitter stroke={1.5} />,
  linkedin: <IconBrandLinkedin stroke={1.5} />,
  github: <IconBrandGithub stroke={1.5} />,
  youtube: <IconBrandYoutube stroke={1.5} />,
  website: <IconWorld stroke={1.5} />,
}

export const AboutMeBlockComponent = ({ headline, description, photo, socialLinks }: any) => {
  return (
    <section className="my-16 max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
      
      {/* Profile Picture */}
      {photo?.url && (
        <div className="flex-shrink-0 relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-50 shadow-lg">
          <Image 
            src={photo.url} 
            alt={photo.alt || 'Profile Picture'} 
            fill 
            className="object-cover"
          />
        </div>
      )}

      {/* Text and Links */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          {headline}
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>

        {/* Social Links dynamically mapped to Tabler Icons! */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {socialLinks.map((social: any, index: number) => {
              
              // Get the correct icon based on the editor's selection
              const Icon = iconMap[social.platform as keyof typeof iconMap]

              // Make sure the link object exists before rendering
              if (!social.link) return null

              return (
                <CMSLink 
                  key={index} 
                  link={social.link} // Passes the Payload link object
                  className="flex items-center justify-center p-3 bg-gray-50 text-gray-700 hover:text-white hover:bg-blue-600 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                  aria-label={`Visit my ${social.platform}`}
                >
                  {/* The icon acts as the "children" prop inside CMSLink */}
                  {Icon}
                </CMSLink>
              )
            })}
          </div>
        )}
      </div>
      
    </section>
  )
}