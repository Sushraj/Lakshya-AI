# Lakshya AI Engineering Instructions

## Product

Lakshya AI is an AI-powered personal life copilot that connects a user's
health, finances, habits, productivity and travel decisions.

The hackathon MVP must contain:

1. Authentication
2. Personalized onboarding
3. Daily dashboard
4. Daily check-in
5. AI focus planner
6. Marathi vegetarian health coach
7. Money-aware travel planner
8. Unified AI coach
9. Vercel and Supabase deployment

## Technical stack

- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- shadcn/ui
- Supabase Auth and PostgreSQL
- OpenAI Responses API
- Zod validation
- Vercel deployment

## Engineering rules

- Prefer Server Components.
- Use Client Components only for forms and interactive UI.
- Keep OpenAI API keys server-side.
- Never expose service-role keys to the browser.
- Validate every route input using Zod.
- Validate AI-generated structured output.
- Use accessible semantic HTML.
- Build responsive layouts for mobile, tablet and desktop.
- Do not add unnecessary libraries.
- Do not implement a multi-agent framework.
- Do not implement vector search unless all MVP features work.
- Do not make medical diagnoses or medication recommendations.
- Do not make investment recommendations.
- Travel recommendations are budgeting guidance only.
- Every database table must use Row Level Security.
- Run lint and build after every major feature.

## Visual direction

Create a calm, premium and motivating personal-development interface.

- Warm off-white background
- Dark slate text
- Emerald primary accent
- Soft amber for streaks and achievement
- Large rounded cards
- Subtle borders
- Minimal shadows
- Generous whitespace
- Clear data hierarchy
- No excessive gradients
- No glassmorphism everywhere
- Avoid generic chatbot appearance

## Application navigation

- Dashboard
- Today
- Focus
- Health
- Travel
- Coach
- Profile

## Definition of done

A feature is complete only when:

- The UI works responsively.
- Loading, empty and error states exist.
- Input is validated.
- Data is persisted where applicable.
- TypeScript passes.
- ESLint passes.
- Production build passes.