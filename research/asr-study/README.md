# A Review of Automatic Speech Recognition (ASR)
**Author:** Sanjid Hasan  
**Date:** Feb 2026

let's talk about evaluation first. 
### WER (Word Error Rate)
follow this page on [huggingface](https://huggingface.co/learn/audio-course/chapter5/evaluation)

Now There's  a fact that ASR isn't a single handed task , filtering noise , classifying(!) or denoising echoes or reverbs , we've seen multiple attempts to fix them using diverse approaches, models and data. Some common observations can be drawn from these efforts:
+ there is no “catch-all” model, 
+ no single dataset is sufficient for evaluation
+ a single metric, i.e., word error rate (WER), is not enough.
  
So , the [paper](https://arxiv.org/pdf/2510.06961v3) introduces a benchmark of various languages and creates a [leaderboard](https://huggingface.co/spaces/hf-audio/open_asr_leaderboard)
<img width="946" height="467" alt="image" src="https://github.com/user-attachments/assets/75fb4eb5-cfef-4afe-91c2-eab7c10b1481" />



## Paper 01: [OPEN ASR LEADERBOARD](https://arxiv.org/pdf/2510.06961v3)
As ASR evaluations are saturated with short form English , very few models and papers brings a light of hope. Here, Two metrices  ```word error rate (WER)``` and ```inverse real-time factor (RTFx)```.

Conformer encoders are slow but accurate, CTC and TDT are of better RTXs.However hisper-derived encoders fine-tuned for English improve
accuracy but often trade off multilingual coverage [[1]](https://arxiv.org/pdf/2510.06961v3)

SSL models have enabled ASR systems to 1K+ models ,but none reaches at top. Using whispers(openAI) encoder is a common trend ```whisper-v3-large``` because it was trained on a large corpus, Although there are accuracy vs ubiquitousity problem at which whisper is unmatched ,99 languages !

### Conclusion of paper 01 : Conformer–LLM models achieve the strongest English WER
but at the cost of higher latency, whereas CTC/TDT decoders
offer faster inference with only modest accuracy trade-offs,
making them attractive for long-form transcription. 

# We will be back with another paper......Au revoir!


