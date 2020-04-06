import React from 'react';
import sound from '../../assets/sound.mp3'

export default () => <audio id="audio" controls><source src={sound} type="audio/mpeg"/></audio>
