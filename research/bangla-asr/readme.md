Long ago before transformer paper, scientists have worked on rule based,word level ASR models based on Hidden Markov process and complex designs until GPUs and Big Data took over. Therefore , high resource languages like English instantly became accessible with many speech technologies. 

But Bangla has one gap,datasets. Researchers used to create dataset of their own but lack of combined effort made it slow. Not all of them were public datasets at that time. However, ASR research and TTS models were good only for the West Bengal domain, untouched here.

OpenSLR , CommonVoice , OOD Speeches were the very first large volume dataset for ASR for Bengali. Gradually , models started improving . Big techs like Google wont spend money here because the ROI was not simply enough for them . However they set up a kaggle competition with bengali AI. A lot of data scientists took part and a scientist named Tugstugi introduced a faster whisper medium for bangla, he collected almost 300+ hour data of bangla form youtube, trained a new tokenizer and finetuned the model. His model still remains the winner for every ASR competition that happens in Bangla.

However,whisper comes with GPU constraints and it can be made faster using CTC and methods like faster whisper. In 2023, Hishab managed to collect a 20K hr dataset and train the Conformer model on that, Conformer Model was way faster than any whisper variants available ,good with noisy data almost like whisper,lesser than whisper. 

In parallel, ASR research went on at a slow pace, wave2ve , HubertASR etc models were being studied. But whisper was pretrained on an insane amount of data which sort of makes other models look feeble.

Now that we got a model on the dataset and to verify, Why people still wont use ASR? Maybe it gives the wrong answer, maybe it’s too slow, maybe it has some other issues?

Research went on…A few groups of researchers discovered dialect based audio models weakness. Biomedical researchers tried to implement ASR and issues came forth. Again, long form audio remains a bottleneck. Because we either chunk it or pad it to make it in whispers format. 

Bengali loop, DL sprint  4.0 competition were introduced to bridge the gap for long form audios and slower models. LIPiGHor an 882 hour dataset  , and Moonshine base bn, a model that gets the best RTF score for any bangla audio etc models became available for just bangla.

Still noisy data leaves a bottleneck. Which leaves us wishing to make a noise bench dataset.
