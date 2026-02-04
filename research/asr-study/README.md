# A Review of Automatic Speech Recognition (ASR)
**Author:** Sanjid Hasan  
**Date:** Feb 2026

let's talk about evaluation first. 
# WER (Word Error Rate)
follow this page in [huggingface](https://huggingface.co/learn/audio-course/chapter5/evaluation)

## Paper 01: [OPEN ASR LEADERBOARD](https://arxiv.org/pdf/2510.06961v3)
As ASR evaluations are saturated with short form English , very few models and papers brings a light of hope. Here, Two metrices  ```word error rate (WER)``` and ```inverse real-time factor (RTFx)```.

Conformer encoders are slow but accurate, CTC and TDT are of better RTXs.However hisper-derived encoders fine-tuned for English improve
accuracy but often trade off multilingual coverage [[1]](https://arxiv.org/pdf/2510.06961v3)
