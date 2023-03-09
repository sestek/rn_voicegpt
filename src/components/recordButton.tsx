import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { DTORecordButtonProps, DTORecordButtonRef } from '../types';
import Lottie from 'lottie-react-native';
import RNAudioRecordPlayer from 'react-native-audio-recorder-player';
import { PermissionsManager } from '../functions/permissionManager';

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
                const checkMic = await PermissionsManager.checkMicrophone();
                if (checkMic) {
                    lottieRef.current.play();
                    await audioRecord.startRecorder();
                    audioRecord.addRecordBackListener((e) => {
                        return;
                      });
                }
                else {
                    triggerRecord();
                }
            }
            else {
                lottieRef.current.reset();
                var result = await audioRecord.stopRecorder();
                audioRecord.removeRecordBackListener();
                console.log(result);
            }
        }
    }

    const lottieRef = useRef<Lottie>(null);

    return (
        <TouchableOpacity onPressIn={triggerRecord} onPressOut={triggerRecord} style={{ alignItems: 'center' }}>
            <Lottie
                ref={lottieRef}
                style={{ width: 200, height: 200 }}
                source={require('../lottie/record.json')}
                loop
            />
        </TouchableOpacity>
    )
});