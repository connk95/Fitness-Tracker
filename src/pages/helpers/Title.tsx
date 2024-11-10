import * as React from "react";
import { useInView, animated } from "@react-spring/web";

import { buildInteractionObserverThreshold } from "./threshold";

export const Title = ({
  text,
  font,
}: {
  text: React.ReactNode;
  font: string;
}) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 80,
      },
      to: {
        opacity: 1,
        y: 0,
      },
    }),
    {
      rootMargin: "-5% 0px -5% 0px",
      amount: buildInteractionObserverThreshold(),
    }
  );

  return (
    <animated.h2 ref={ref} style={springs} className={font}>
      {text}
    </animated.h2>
  );
};
