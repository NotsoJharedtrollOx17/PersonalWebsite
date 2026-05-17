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

Our findings strongly suggest that emotion vector may be a universal property of transformer-based LLMs, and that we may utilize these vectors as a monitoring mechanism signaling aligned, or misaligned emotions. The complete analysis and writing is [_found here_.](https://github.com/NotsoJharedtrollOx17/EmotionVectorExtraction-Gemma4-GPT2)

## Anthropic's Emotion Vectors

Anthropic published a paper that proposed that emotion vectors can be extracted from Claude Sonnet 4.5 by generating 1000 stories per emotions, and then capture the hidden activations representing the semantical concept of that particular emotion. Afterwards, they performa various experiments to check underlying structures, and importantly, if these vectors can influence the output of the model. The short answer is they did, and their results are compelling evidence of what I can describe as a fascinating development.

Their PCA Projection plot roughly approximates a widely accepted psychological construct reflect the way we interpret human emotions. To our interest, the x-axis of this particular plot helps our understanding of what can we colloquialy consider a "positive" or "negative" emotion Likewise, their emotion steering heatmaps offer evidence regarding the effects of these vectors over the expected tokens. And the steered text outputs were convincing of the causal effects. 

As we may expect from such a bold claim, we exercised our discretion and decided to attempt to replicate such compelling findings. In today's day and age, I believe it is imperative to close the gap of replicability, and with the age of LLMs, that breach may be easier to patch.

## Other Replication Attemps

As a preliminary step, I though that somebody was already replicating (or finished replicating) the emotion vector findings and I was proven correct. A repo hosted on HuggingFace already attempted a replication of certain sections of the paper, which consists of the Logit Lens, the PCA projection and the Cosine Similarity Matrix. In particular, with very few stories total. Other replications found varied in their extraction dataset but they converged that the extraction method worked. What we found peculiar is that either the rpelications lacked the steering experiments, or they only reported that they did attempt them without pointing to the plots directly. 

In our case, we took a keen interest in replication the steering experiments to empirically check if the steered outputs indeed capture any semantical semblance of the expected emotion vector steered with. In addition, we run our experiment with a list of 9, and 20, emotions with the intent of exploring the semantical and causal strength of these constructs.

## Our Findings

We were perplex that our findings for both GPT 2 Medium and Gemma 4 E2B did replicate the claims from the Emotion Vector publication of Anthropic. Logit Lens indeed displayed tokens that match words and word stems related to the emotion concept, in which Gemma 4 E2B showed multilingual and emoji tokens.

The PCA projections of GPT 2 Medium show a projection similar to the ones reported by Anthropic, while Gemma 4 E2B seems to invert the x-axis of this projection. In particular, the "positive" emotions are now grouped in the leftmost side of the plot.

Regarding the Cosine Similarity findings, our extracted vectors show an emergence of related-emotion clusters. This patterns is much more pronounced when calculating the similarity values for the list of 20 emotions, and this clustering appears on both models.

Finally, our Emotion Steering Experiments against the previously extracted Emotion Tokens show a noticeable effect across exact matches, basically that a steered emotion vector indeed increases the likelihood of its emotion tokens. Happy Vector increases the likelihood of Hpapy Tokens. For some reason, GPT 2 Medium displays some sparse activations of non-matching but related emotion tokens, while Gemma 4 E2B displays a conservative activation strength across the matches. In particular, for 20 emotions, the Disgusted Vector decreases the likelihood of all tokens.

The steered text outputs for both models indeed capture the underlying emotional tone. It is interesting to note that the baseline unsteered responses of GPT 2 Medium seem broken at best, although the steering intervention forced the model to answer the prompt without an abrupt subject change. We believe the underlying input prompt was an edge case that the model couldn't answer coherently, while Gemma 4 E2B answered with a much more appropiate response.

## Lessons Learned

Overall, I'm satisfied that my replication attempt validated the results obtained from the community, and that I could replicate, albeit partially, certain claims reported by Anthropic. It is fascinating to obtain evidence that this construct of emotion vectors do affect the responses of a model. This has several implications on model alignment and model supervision due to the capacity of repurposing emotion vectors as observational tools, and as interventional probes. 

I sincerely believe that the main challenge was extending the data pipeline from the HugginFace repo into the desired steering feature. There should be no doubt that LLM tools like ChatGPT and Gemini helped accelerate our experiment setup speed. Only detail I believe has room for improvement is in regards to replicating the documented experiment setup with the original emotion list of Anthropic. A replication cited in the writing utilized said list and obtain results similar to Anthropic, which in that case aids the conclusions of the publication with greater resolution.

Our limited scope still has utility for those willing to replicate these experiments. I'm convinced that this a small grain of sand into our collaborative effort of validating academic research. I'm convinced that the field of Mechanistic Interpretability may advance further into the line of investigation regarding these Emotion Vectors, which may dictate further scrutiny of LLMs from a phychological perspective.