const defaultTheme = require( "tailwindcss/defaultTheme" )

module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      screens: {
         xs: "375px",
         ms: "425px",
         ...defaultTheme.screens,
      },
      extend: {
         colors: {
            "custom-blue": "var(--blue)",
            "custom-indigo": "var(--indigo)",
            "custom-purple": "var(--purple)",
            "custom-pink": "var(--pink)",
            "custom-orange": "var(--orange)",
            "custom-yellow": "var(--yellow)",
            "custom-star": "var(--star)",
            "custom-green": "var(--green)",
            "custom-teal": "var(--teal)",
            "custom-cyan": "var(--cyan)",
            "custom-red": "var(--red)",
            "custom-hot": "var(--hot)",
            "custom-dark": "var(--dark)",
         },
      },
      container: {
         center: true,
         screens: {
            sm: "600px",
            md: "728px",
            lg: "984px",
            xl: "1240px",
            "2xl": "1496px",
         },
      },
   },
   variants: {
      backgroundColor: ["responsive", "hover", "focus", "group-hover"],
      textColor: ["responsive", "hover", "focus", "group-hover"],
      translate: ["responsive", "hover", "focus", "group-hover"],
      boxShadow: ["responsive", "hover", "focus", "focus-within"],
      opacity: ["responsive", "hover", "focus", "group-hover"],
   },
   plugins: [require( "@tailwindcss/forms" )],
}
