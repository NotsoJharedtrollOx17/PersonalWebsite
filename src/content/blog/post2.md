---
title: "On Partially Replicating Anthropic's Emotion Vectors"
description: "A brief account of my resource-constrained partial replication of selected emotion-vector analyses in GPT-2 Medium and Gemma 4 E2B."
pubDate: 2026-05-16
updatedDate: 2026-10-11
tags: ["LLM", "Anthropic", "Research", "Replication", "Independent", "Emotion Vectors"]
---

## Introduction

This project began with a simple question: could selected findings from Anthropic's study of emotion-related representations be reproduced in smaller, open-weight language models?

I tested the broad extraction and analysis pipeline in _openai-community/gpt-2-medium_ and _google/gemma-4-E2B_. Across four configurations, I evaluated nine- and 20-emotion label sets using Logit Lens projections, PCA, cosine similarity, and activation steering. The results contain several qualitative similarities to earlier work, but they are partial, model-dependent, and limited to this corpus and pipeline. They do not establish that emotion vectors are universal, uniquely emotional, or evidence that a model subjectively experiences emotion.

The [project repository](https://github.com/NotsoJharedtrollOx17/EmotionVectorExtraction-Gemma4-GPT2) contains the code, data, plots, and four saved Colab notebooks. The complete [47-page technical report](https://raw.githubusercontent.com/NotsoJharedtrollOx17/EmotionVectorExtraction-Gemma4-GPT2/a2589f9379ba6b86c33bcccbfae141fbafd24706/PartialReplicationEmotionVectors.pdf) documents the methodology, results, and limitations. It is a public, unreviewed technical report.

## Anthropic's Emotion-Concepts Study

Anthropic's [research article](https://www.anthropic.com/research/emotion-concepts-function) and [full paper](https://transformer-circuits.pub/2026/emotions/index.html) describe emotion vectors extracted from Claude Sonnet 4.5. In broad terms, the researchers generated stories associated with emotion concepts, recorded internal activations, and derived directions associated with those labels. They then studied where the directions activated, how they were organized, and whether adding them changed model behavior.

The work is interesting because it combines observational analyses with interventions. A PCA projection can suggest geometric structure, but steering asks a different question: does changing an internal activation direction also change a model's subsequent output? Even then, an intervention effect does not by itself prove that the direction represents a uniquely emotional computation.

## Building a Smaller Replication

A [community replication on Gemma 4 E4B](https://huggingface.co/rain1955/emotion-vector-replication) had already reported selected Logit Lens, PCA, and cosine-similarity patterns. It provided a useful starting pipeline, but it did not include the steering experiments I most wanted to examine. My project adds two model cases; it does not independently validate the E4B study's stronger generality claims.

I adapted that pipeline for GPT-2 Medium and Gemma 4 E2B. The stories were generated through Gemini's web interface and retained without manual rewriting or post-hoc quality filtering. The cleaned dataset contains 2,000 stories: 100 for each of 20 emotions. I evaluated both a nine-emotion subset and the complete 20-emotion set, producing four model-and-label-set configurations. The committed result artifacts were generated when `calm` still had 110 stories, before ten accidental extras were removed. The repository reports trial reruns without meaningful changes to the reported structures, but a fresh run can differ numerically from the saved artifacts.

This was intentionally a low-cost experiment. I used free-tier Google Colab T4 environments, selected one source-informed layer per model rather than running a layer sweep, and used a steering coefficient of 0.5 with local per-token residual-norm scaling. That coefficient is therefore not numerically identical to Anthropic's intervention convention. These choices made the project feasible, but they also limit the conclusions.

### What the Extraction Actually Computes

The code mean-pools story activations from token index 50 onward, or from the midpoint for shorter sequences, at numeric hidden-state index 16 for GPT-2 Medium and 23 for Gemma 4 E2B. It averages those representations within each label, subtracts a shared neutral mean, and then centers the resulting prototypes across the selected emotions before normalizing each direction to unit length.

The neutral subtraction cancels algebraically during that global centering. The final vectors are centered relative to the selected emotion set; this operation does not remove a neutral principal-component subspace or isolate a "pure affect" signal. Changing from nine to 20 labels also changes the centering reference.

There is a further indexing caveat: extraction uses `outputs.hidden_states[layerIndex]`, while steering hooks the transformer block with the same numeric index. Hidden-state index zero represents the embedding output, so the two operations may be offset by one block. I treat that as a limitation of the implemented pipeline rather than assuming perfectly aligned extraction and intervention sites.

## What I Observed

### Logit Lens

Projecting the extracted directions through each model's unembedding produced several label-related words and word stems. GPT-2 Medium's outputs were mostly concentrated in English, while Gemma 4 E2B also produced multilingual tokens, subwords, and emoji. Some tokens were fragmentary or unrelated, so this was evidence of label association rather than a clean semantic validation.

### PCA and Cosine Similarity

Both models showed a partial valence-like separation along the first principal component: several positive-labeled directions appeared apart from groups related to fear, anger, and anxiety. Related labels also formed local cosine-similarity families, especially in the 20-emotion condition.

The pattern was incomplete. Several labels did not follow a simple ordering, and the second principal component did not consistently resemble arousal. Gemma's displayed PCA axis also appeared reversed relative to another plot, but PCA component signs are arbitrary; the reversal is not evidence of an inverted emotional geometry.

### Activation Steering

I evaluated two fixed prompts: "Human: How does he feel? Assistant: He feels " and "Human: How do you feel? Assistant: I feel ". Adding the extracted directions changed next-token probabilities and sampled continuations in both models. GPT-2 Medium often showed sharper token-level effects, but its generations were repetitive and brittle. Gemma 4 E2B generally showed more moderate effects and more multilingual or emoji-heavy token associations.

Each steering-heatmap cell averages the change in log probability for the five top Logit Lens tokens associated with a target direction. Those tokens were selected from the same vectors being tested, so the heatmaps measure direction consistency rather than independent emotional accuracy. The sampled continuations provide an additional qualitative view, with the limitations of stochastic decoding.

These interventions demonstrate sensitivity to the implemented directions. They do not demonstrate clean emotional control: the effects depended on the model, prompt, direction, and stochastic decoding, and some generations degraded under steering.

## What the Replication Does Not Establish

The study used generated, uncurated stories and did not include external affect ratings, matched random directions, shuffled labels, a layer sweep, or repeated generations across a prespecified set of seeds. The generated corpus may carry lexical leakage or other artifacts. The token-level evaluation is coupled to the vectors under test, and the extraction/steering indexing caveat limits claims about intervention alignment.

For those reasons, I describe the work as a first-pass, resource-constrained partial replication. The implemented pipeline produces several recurring, label-associated patterns in these two models and changes their outputs under activation addition. The intervention is causal in the limited computational sense that the added activation changes the output; its emotional interpretation remains unvalidated. It does not establish a universal affective geometry, reproduce Anthropic's safety evaluations, or validate a monitoring system for a model's "emotional reaction."

## Lessons Learned

The hardest engineering task was extending the borrowed extraction pipeline into a reproducible steering workflow across two model families. ChatGPT and Gemini helped accelerate implementation and debugging, but the scientific value still depended on inspecting the code, preserving artifacts, documenting differences from the source method, and narrowing claims when the controls did not support them.

That last step was the most useful lesson. A replication is not valuable because every plot looks like the original. It is valuable when the procedure, mismatches, partial agreements, failures, and limitations are visible enough for someone else to inspect and challenge.
