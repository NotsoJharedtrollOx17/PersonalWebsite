# General resume synchronization

Date: 2026-10-11

The general `main` branch of `08-LocalCVResume` at `547b21d` and its canonical fact ledger supersede the CV decisions in the August website-writing audit. All four final named PDFs were inspected alongside the branch differences. The public website uses the general version; program tailoring remains in the resume repository.

The old website PDF was an August 11 research-oriented resume. The selected final artifact is `paper/build/Abraham_Flores_Azcona_Resume_General.pdf`, built September 4. `paper/build/main.pdf` currently contains the UCI-SDSU variant, and `agent-docs/abraham_flores_azcona_general_phd_resume.pdf` is explicitly historical.

The web CV now follows the general resume's Summary, Education, Experience, Selected Public Projects, Selected Presentations, Technical Skills, and Additional Training. Education separates attendance through December 2023 from November 2024 degree conferral and uses GPA 95.12/100. The Emotion Vectors work ends July 2026 and links the public technical report under projects. BlueBoard retains the original-MkI platform boundary and v1.0.1 documentation tag. All four presentations preserve the confirmed author order. Homepage, CV headline, and descriptions use AI/ML Systems Engineer.

The PDF link uses the named general file. The former public PDF address is retained with identical current bytes for compatibility. See the README for the update workflow.

Validation: the Astro production build passed. The built CV has the expected seven sections, corrected facts, and all 11 artifact links from the general PDF. Both `public/` and `dist/` PDF copies match the source SHA-256 `ba9e9f2d959bc7eaa432780ce8203c51237de00047224e4f213b20d157713bd2`. Both US Letter PDF pages were rendered and visually inspected. The local preview served the homepage, CV page, and both PDF addresses successfully; PDF responses had HTTP 200, `application/pdf`, and exact source bytes. Browser visual verification was unavailable because no browser was connected. Changes remain local; deployment is triggered by a push to `release`.
