import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function SignalStrengthIcon ({ signalStrength }) {
  const bars = [];
  let height = 6;
  for (let i = 0; i < 4; i++) {
    const barHeight = height + (i * 2);
    const opacity = i < signalStrength ? 1 : 0.3;
    bars.push(
      <Path key={i} d={`M${i * 3} ${12 - barHeight}h2v${barHeight}H${i * 3}`} fill="white" opacity={opacity} />
    );
  }
  return (
    <View>
      <Svg viewBox={`0 0 ${4 * 3} 12`} width={16} height={16}>
        {bars}
      </Svg>
    </View>
  );
};


