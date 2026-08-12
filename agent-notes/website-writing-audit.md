# Website Writing Audit

Date: 2026-08-11

## Scope

This audit covers the visitor-facing prose in the homepage, CV page, blog posts, metadata, RSS description, and README. Visual design and interaction behavior are intentionally out of scope.

## Sources of Truth

- The current research-oriented CV source at `08-LocalCVResume/paper/main.tex` and its admissions review notes.
- The Emotion Vectors manuscript, companion repository, saved artifacts, and prior methodology/provenance review.
- The published Anthropic emotion-concepts study and the cited Gemma 4 E4B community replication.

## High-Priority Findings

### CV page

- The page repeated an older one-page résumé rather than the current research-oriented CV.
- Education ended in December 2023 on the website but January 2024 in the current CV; the GPA presentation also differed.
- The thesis entry used ambiguous "passing average" percentages and implied a discovery without exposing the 39-student quasi-experimental design or its confounds.
- The ENLACE entry rounded both models to approximately 97% and omitted the exact held-out comparison: 0.9724 ROC AUC for the larger DNN versus 0.9751 for the laboratory GNN baseline.
- The tutoring entry reported 50+ students and inconsistent attendance language; the current evidence supports 62 students and a separate attendance-pattern analysis, not a causal claim about grades.
- The page omitted the independent Emotion Vectors research, manuscript in preparation, research interests, and selected presentations.
- The IBM and McKinsey certifications were retained despite being deliberately removed from the PhD-oriented CV.
- The "View Full CV" link targeted the obsolete Google Drive PDF.

### Emotion Vectors post

- The title and body contained spelling and grammatical errors, including "Partialy," "alos," "performa," "attemps," "sleected," "HugginFace," "suppports," and "phychological."
- The post claimed that emotion vectors may be universal and could monitor a model's emotional reaction. The collected experiments do not support either claim.
- The post treated Gemma's apparent PCA sign reversal as substantive even though PCA component signs are arbitrary.
- PC1 was described too confidently as positive/negative emotion geometry, while PC2 and the limitations of the small label sets were not handled.
- Steering effects were described as clean causal emotional control. The evidence supports intervention sensitivity, with model-, prompt-, direction-, and sampling-dependent degradation.
- The experiment scope, cleaned story count, artifact provenance, source-informed layer/alpha choices, and missing controls were absent.

### AI-agents post and site metadata

- The first post read as generic product copy and implied that agents learn from experience by default.
- The conclusion promised future formal-verification research that the rest of the site did not substantiate.
- Homepage and metadata descriptions were broad and did not reflect the research-centered CV.
- The CV ticker contained a capitalization typo (`AI INtegration`) and an outdated skills list.

## Revision Decisions

- Reorder the web CV around research interests, education, research experience, manuscript status, industry experience, teaching, and selected presentations.
- Preserve exact, defensible quantities and qualify observational findings.
- Host the current two-page CV PDF with the website so the displayed page and downloadable artifact cannot drift immediately.
- Keep the Emotion Vectors post informal and first-person, but distinguish label-associated directions and intervention effects from subjective emotion or universal representations.
- Reframe the agents post around system boundaries, permissions, verification, observability, and evaluation.
