import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { DTORecordButtonProps, DTORecordButtonRef } from '../types';
import Lottie from 'lottie-react-native';
import RNAudioRecordPlayer from 'react-native-audio-recorder-player';

let audioRecord: RNAudioRecordPlayer;

export const RecordButton = forwardRef<DTORecordButtonProps, DTORecordButtonRef>((props, ref) => {

    useEffect(() => {
        audioRecord = new RNAudioRecordPlayer();
    }, [])

    const [record, setRecord] = useState<boolean>(false);
    const triggerRecord = () => setRecord(old => !old);
    useEffect(() => {
        fncTriggerRecord();
    }, [record]);

    const fncTriggerRecord = async () => {
        if (lottieRef?.current) {
            if (record) {
                lottieRef.current.play();
                await audioRecord.startRecorder();
            }
            else {
                lottieRef.current.reset();
                var result = await audioRecord.stopRecorder();
                console.log(result);
            }
        }
    }

    const lottieRef = useRef<Lottie>(null);

    return (
        <TouchableOpacity onPressIn={triggerRecord} onPressOut={triggerRecord} style={{ backgroundColor: 'blue' }}>
            <Lottie
                ref={lottieRef}
                style={{ width: 200, height: 200 }}
                source={require('../lottie/record.json')}
                loop
            />
        </TouchableOpacity>
    )
});