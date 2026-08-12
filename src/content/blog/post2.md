---
title: "On Partially Replicating Anthropic's Emotion Vectors"
description: "A brief account of my resource-constrained partial replication of selected emotion-vector analyses in GPT-2 Medium and Gemma 4 E2B."
pubDate: 2026-05-16
updatedDate: 2026-08-11
tags: ["LLM", "Anthropic", "Research", "Replication", "Independent", "Emotion Vectors"]
---

## Introduction

This project began with a simple question: could selected findings from Anthropic's study of emotion-related representations be reproduced in smaller, open-weight language models?

I tested the broad extraction and analysis pipeline in _openai-community/gpt-2-medium_ and _google/gemma-4-E2B_. Across four configurations, I evaluated nine- and 20-emotion label sets using Logit Lens projections, PCA, cosine similarity, and activation steering. The results contain several qualitative similarities to earlier work, but they are partial, model-dependent, and limited to this corpus and pipeline. They do not establish that emotion vectors are universal, uniquely emotional, or evidence that a model subjectively experiences emotion.

The [project repository](https://github.com/NotsoJharedtrollOx17/EmotionVectorExtraction-Gemma4-GPT2) contains the code, data, plots, saved notebooks, and draft manuscript.

## Anthropic's Emotion-Concepts Study

Anthropic's [research article](https://www.anthropic.com/research/emotion-concepts-function) and [full paper](https://transformer-circuits.pub/2026/emotions/index.html) describe emotion vectors extracted from Claude Sonnet 4.5. In broad terms, the researchers generated stories associated with emotion concepts, recorded internal activations, and derived directions associated with those labels. They then studied where the directions activated, how they were organized, and whether adding them changed model behavior.

The work is interesting because it combines observational analyses with interventions. A PCA projection can suggest geometric structure, but steering asks a different question: does changing an internal activation direction also change a model's subsequent output? Even then, an intervention effect does not by itself prove that the direction represents a uniquely emotional computation.

## Building a Smaller Replication

A [community replication on Gemma 4 E4B](https://huggingface.co/rain1955/emotion-vector-replication) had already reproduced selected Logit Lens, PCA, and cosine-similarity patterns. It provided a useful starting pipeline, but it did not include the steering experiments I most wanted to examine.

I adapted that pipeline for GPT-2 Medium and Gemma 4 E2B. The cleaned dataset contains 2,000 generated stories: 100 for each of 20 emotions. I evaluated both a nine-emotion subset and the complete 20-emotion set, producing four model-and-label-set configurations. The committed plots were generated before ten accidental extra `calm` stories were removed, so a fresh run may differ slightly in its numerical values.

This was intentionally a low-cost experiment. I used free-tier Google Colab T4 environments, selected one source-informed layer per model rather than running a layer sweep, and used a steering coefficient of 0.5 with local per-token residual-norm scaling. That coefficient is therefore not numerically identical to Anthropic's intervention convention. These choices made the project feasible, but they also limit the conclusions.

## What I Observed

### Logit Lens

Projecting the extracted directions through each model's unembedding produced several label-related words and word stems. GPT-2 Medium's outputs were mostly concentrated in English, while Gemma 4 E2B also produced multilingual tokens, subwords, and emoji. Some tokens were fragmentary or unrelated, so this was evidence of label association rather than a clean semantic validation.

### PCA and Cosine Similarity

Both models showed a partial valence-like separation along the first principal component: several positive-labeled directions appeared apart from groups related to fear, anger, and anxiety. Related labels also formed local cosine-similarity families, especially in the 20-emotion condition.

The pattern was incomplete. Several labels did not follow a simple ordering, and the second principal component did not consistently resemble arousal. Gemma's displayed PCA axis also appeared reversed relative to another plot, but PCA component signs are arbitrary; the reversal is not evidence of an inverted emotional geometry.

### Activation Steering

Adding the extracted directions changed next-token probabilities and sampled continuations in both models. GPT-2 Medium often showed sharper token-level effects, but its generations were repetitive and brittle. Gemma 4 E2B generally showed more moderate effects and more multilingual or emoji-heavy token associations.

These interventions demonstrate sensitivity to the implemented directions. They do not demonstrate clean emotional control: the effects depended on the model, prompt, direction, and stochastic decoding, and some generations degraded under steering.

## What the Replication Does Not Establish

The study used generated, uncurated stories and did not include external affect ratings, matched random directions, shuffled labels, a layer sweep, or repeated generations across fixed seeds. The token-level steering diagnostic also reused tokens selected from each direction's own Logit Lens projection, coupling part of the evaluation to the vectors under test.

For those reasons, I describe the work as a first-pass, resource-constrained partial replication. It shows that the extraction-and-intervention procedure transfers to these two additional models and produces several recurring qualitative patterns. It does not establish a universal affective geometry or a monitoring system for a model's "emotional reaction."

## Lessons Learned

The hardest engineering task was extending the borrowed extraction pipeline into a reproducible steering workflow across two model families. ChatGPT and Gemini helped accelerate implementation and debugging, but the scientific value still depended on inspecting the code, preserving artifacts, documenting differences from the source method, and narrowing claims when the controls did not support them.

That last step was the most useful lesson. A replication is not valuable because every plot looks like the original. It is valuable when the procedure, mismatches, partial agreements, failures, and limitations are visible enough for someone else to inspect and challenge.
