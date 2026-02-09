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

## So, we got a few models from openAI , NVIDIA , Alibaba ,Moonshine and many more foundational models
Meta's OmniASR is considerably new ,besides it is open weight ,not open source so let's not go with it.
* Whishper Family ```v3 large``` and ``v3-turbo``
* Nemo ```canary 1B 2.5B ``` and ```parakeet(CTC) & TDT ```
* Qwen-Audio `Qwen3-ASR (1.7B)`
* Moonshine **tiny** **faster** ...boost
* Firered (SOTA on madarine)


| Model Family | Variant | Parameters | Architecture | Est. WER (Bengali) | Est. RTFx (GPU) | Inference Score Potential |
| :--- | :--- | :---: | :--- | :--- | :---: | :---: |
| **Parakeet** | TDT | 0.6B | Transducer | Good (~7-8%) | 3386 | 99-100 |
| **SenseVoice** | Small | N/A | Non-Autoregressive | Good | High (~1500) | 90-95 |
| **Moonshine** | Tiny | 27M | Enc-Dec | Moderate (~10-12%) | High (CPU) | 85-95 |
| **Whisper** | v3 Turbo | 809M | Transformer | Very Good (~6%) | 216 | 60-75 |
| **Canary** | Qwen-2.5B | 2.5B | FastConformer | Excellent (~5%) | 418 | 70-80 |
| **Whisper** | Large v3 | 1.55B | Transformer | Excellent (~5.5%) | 68 | 30-40 |
| **FireRedASR** | LLM-L | 8.3B | Adapter-LLM | SOTA (~4.5%) | < 20 | 1-10 |


Source:[Goddamnit,You need source!](https://github.com/Sanjidh090/sanjidh090.github.io/blob/main/research%2Fasr-study%2FASR%20and%20Diarization%20Model%20Comparison.pdf)

We have tried one model by [Hisab](https://huggingface.co/hishab/titu_stt_bn_fastconformer) the conformer model required a lot of processing and it's vulnerable to echoes and reverbs, We also noticed hallucination loop but somehow it was able to detect words whisper model could not. WER rate was nearly 0.71 at zero shot..Very iconic ,huh?



Alright, I am making a list on materials I could gather,
1. https://www.gladia.io/blog/fine-tuning-asr-models
2. https://apxml.com/courses/applied-speech-recognition/chapter-4-advanced-acoustic-models/practice-finetuning-pretrained-model
3. https://fxis.ai/edu/how-to-train-and-evaluate-an-automatic-speech-recognition-asr-model/
4. https://huggingface.co/learn/audio-course/chapter5/asr_models
5. https://openai.com/index/whisper/ (gold)
6. https://verbit.ai/transcription/automatic-speech-recognition-asr/
7. https://eleanorchodroff.com/tutorial/kaldi/introduction.html
8. http://kaldi-asr.org/doc/kaldi_for_dummies.html
9. https://www.reddit.com/r/speechtech/comments/mdort1/need_help_with_training_asr_model_from_scratch/
10.https://nextlevel.ai/best-speech-to-text-models
