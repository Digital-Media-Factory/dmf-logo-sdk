import { useState, useCallback } from 'react';
import { SplashScreen, LogoStyle } from 'dmf-logo-sdk';

export function App() {
  const [isDark] = useState<boolean>(true);
  const [animationKey] = useState<number>(0);

  const handleAnimationComplete = useCallback(() => {
    console.log('Animation completed!');
  }, []);

  return (
    <SplashScreen
      key={animationKey}
      initialLogoStyle={LogoStyle.dmfFullLogo}
      isDark={false}
      duration={2400}
      onAnimationComplete={handleAnimationComplete}
      fullscreen={true}
    />
  );
}

export default App;
