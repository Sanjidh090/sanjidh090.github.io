# A Review of Automatic Speech Recognition (ASR)
**Author:** Sanjid Hasan  
**Date:** Feb 2026

## Introduction
Automatic Speech Recognition (ASR) has evolved from simple Gaussian Mixture Models (GMM) to advanced End-to-End Deep Learning architectures. This study reviews the current state of the art, focusing on **Wav2Vec 2.0** and **Whisper**.

## Key Architectures

### 1. Connectionist Temporal Classification (CTC)
CTC allows the network to learn the alignment between audio frames and text characters automatically.

### 2. Transformer-based Models
Models like OpenAI's *Whisper* utilize the transformer architecture to process audio spectrograms...

## Code Snippet (Python)
Here is how we load a Hugging Face model:

```python
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor

model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
