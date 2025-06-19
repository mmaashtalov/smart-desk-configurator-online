import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				active: {
					DEFAULT: 'hsl(var(--active))',
					foreground: 'hsl(var(--active-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				luxury: {
					black: 'hsl(var(--luxury-black))',
					white: 'hsl(var(--luxury-white))',
					gold: 'hsl(var(--luxury-gold))',
					platinum: 'hsl(var(--luxury-platinum))',
					charcoal: 'hsl(var(--luxury-charcoal))',
					pearl: 'hsl(var(--luxury-pearl))',
					onyx: 'hsl(var(--luxury-onyx))',
				},
				'wood-primary': '#A0522D',
				'wood-secondary': '#8B4513',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
				'144': '36rem',
				'160': '40rem',
			},
			fontSize: {
				'2xs': '0.625rem',
				'5xl': '3rem',
				'6xl': '3.75rem',
				'7xl': '4.5rem',
				'8xl': '6rem',
				'9xl': '8rem',
			},
			letterSpacing: {
				'tighter': '-0.05em',
				'tight': '-0.025em',
				'wide': '0.025em',
				'wider': '0.05em',
				'widest': '0.15em',
			},
			lineHeight: {
				'extra-tight': '1.1',
				'super-tight': '0.85',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'luxury-reveal': {
					'0%': {
						opacity: '0',
						transform: 'translateY(48px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'luxury-fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'luxury-slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(64px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'luxury-scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'luxury-reveal': 'luxury-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
				'luxury-fade-in': 'luxury-fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
				'luxury-slide-up': 'luxury-slide-up 1s cubic-bezier(0.16, 1, 0.3, 1)',
				'luxury-scale-in': 'luxury-scale-in 1s cubic-bezier(0.16, 1, 0.3, 1)',
				'shimmer': 'shimmer 3s infinite',
				'float': 'float 6s ease-in-out infinite'
			},
			backdropBlur: {
				xs: '2px',
			},
			boxShadow: {
				'luxury': 'var(--shadow-luxury)',
				'luxury-lg': 'var(--shadow-luxury-lg)',
				'gold': 'var(--shadow-gold)',
				'inner': 'var(--shadow-inner)',
				'luxury-inset': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
			},
			backgroundImage: {
				'gradient-luxury': 'var(--gradient-luxury)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-pearl': 'var(--gradient-pearl)',
			}
		}
	},
	plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config;
