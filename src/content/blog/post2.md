---
title: "On Partialy Replicating Anthropic's Emotion Vectors"
description: "Briefing on my independent replication attempt at Anthropic's publication regarding Emotion Vectors on Large Language Models."
pubDate: 2026-05-16
tags: ["LLM", "Anthropic", "Research", "Replication", "Independent", "Emotion Vectors"]
---

## Introduction

In this blog entry, I describe my experience attempting to replicate certain sections of
Anthropic's Emotion Vectors. Overall, the construct known as emotion vectors can be extracted from such an old model like _openai-community/gpt-2-medium_, and the captured semantical understanding of such emotion can influence the output of the model. What it is cool is that
we alos found substantial evidence of this construct existing on _google/gemma-4-E2B_, which provides further confirmation of the findings found in a prior replication hosted on HuggingFace.

Our findings strongly suggest that emotion vectors may be a universal property of transformer-based LLMs, and we may utilize these vectors as a monitoring mechanism based on signals on aligned, or misaligned emotions. The complete analysis is [_found here_.](https://github.com/NotsoJharedtrollOx17/EmotionVectorExtraction-Gemma4-GPT2)

## Anthropic's Emotion Vectors

Anthropic published a paper that proposed that emotion vectors can be extracted from Claude Sonnet 4.5 by generating 1000 stories per emotions, and then capture the hidden activations representing the semantical concept of that particular emotion. Afterwards, they performa various experiments to check underlying structures, and importantly, if these vectors can influence the output of the model. The short answer is they did, and their results are compelling evidence of what I can describe as a fascinating development.

Their PCA Projection plot roughly approximates a widely accepted psychological construct reflect the way we interpret human emotions. To our interest, the x-axis of this particular plot helps our understanding of what can we colloquialy consider a "positive" or "negative" emotion Likewise, their emotion steering heatmaps offer evidence regarding the effects of these vectors over the expected tokens. And the steered text outputs were convincing of the causal effects. 

From such a bold claim, I enacted a healthy level of skepticism. I exercised my discretion and tried to replicate such compelling findings. In today's day and age, it is imperative to close the gap on academic replicability, and with the age of AI, that breach may be easier to patch.

## Other Replication Attemps

As a preliminary step, I expected that somebody had already replicated (or finished replicating) the emotion vector findings, and I was proven correct. A repo hosted on HuggingFace already replicated certain sections of the paper, consisting of the Logit Lens, the PCA Projection and the Cosine Similarity Matrix. In particular, with a dataset comprising of few stories total. Other replications found had varied story counts in their dataset but they converged on the fact that the extraction method worked. What I find peculiar is that either the consulted replications lacked the steering experiments, or they only reported their attempt without supporting citations of the plots.

In my case, I took a keen interest in replicating the steering experiments to empirically check if the steered text outputs indeed capture the underlying emotion vector. Simply put, that adding, for example ```happy``` will really generate a semantically happy story. In addition, we run our experiments with a list of 9, and 20, emotions to explore the semantical and causal strength of these constructs.

## Our Findings

I was perplex that our findings for both _openai-community/gpt-2-medium_ and _google/gemma-4-E2B_ did replicate the sleected sections from the Emotion Vectors publication. Logit Lens indeed displayed tokens that match words and word stems related to the emotion concept, in which _google/gemma-4-E2B_ showed multilingual and emoji tokens.

The PCA projections of _openai-community/gpt-2-medium_ display a projection similar to the ones reported by Anthropic, while _google/gemma-4-E2B_ seems to invert the x-axis of this projection. In particular, the "positive" emotions are now grouped in the leftmost side of the plot.

Regarding the Cosine Similarity findings, our extracted vectors show an emergence of related-emotion clusters. This pattern is much more pronounced when calculating the similarity values for the list of 20 emotions. The clustering effect appears on both models.

Furthermore, our Emotion Steering experiments against the previously extracted Emotion Tokens show a noticeable effect across exact matches, basically that a steered emotion vector indeed increases the likelihood of its emotion tokens. For example, that the ```happy``` vector increases the likelihood of ```happy``` Tokens. For some reason, _openai-community/gpt-2-medium_ displays sparse activations of non-matching but related emotion tokens, while _google/gemma-4-E2B_ displays a conservative activation strength across exact matches. In particular, for 20 emotions, the ```disgusted``` vector decreases the likelihood of all tokens. Further research is needed to clarify why that is the case.

The steered text outputs of both models do capture the underlying emotional tone. It is interesting to note that the baseline _(unsteered)_ responses of _openai-community/gpt-2-medium_ seem broken at best, although steering forced the model to answer the prompt without an abrupt subject-matter change. We believe the underlying input prompt was an edge case that the model couldn't answer properly.

## Lessons Learned

Overall, I'm satisfied with the achievements obtained by my replication attempt. They validated the results obtained from the community, and to a degree, specific claims reported by Anthropic. It is fascinating to obtain evidence that this construct of emotion vectors can affect the responses of a model. This has several implications on model alignment and model supervision. We can now repurpose the same emotion vectors as observational tools, and as interventional probes, to monitor the "emotional reaction" of the model against a request.

I sincerely believe the main challenge was extending the data pipeline from the HugginFace repo into the desired steering feature. There should be no doubt that LLM tools like ChatGPT and Gemini helped accelerate the development time of the experiment setup. What is left to do is to replicate the reported results utilizing the original emotion list of Anthropic. A replication cited in the writing obtained results similar to Anthropic with their 171 emotion list, which further suppports Anthropic's conclusions with greater resolution.

Our limited scope still has utility for those willing to replicate these experiments. I'm convinced that this a small grain of sand into our collaborative effort of validating academic research. With this, the field of Mechanistic Interpretability may advance further into the line of investigation regarding these Emotion Vectors, which may dictate further scrutiny of LLMs from a phychological perspective.