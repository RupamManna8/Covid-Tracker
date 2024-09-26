import React from 'react';
import { useSpring, animated } from 'react-spring';
import { IoIosSync } from 'react-icons/io';


const Spinner = () => {
    const spinning = useSpring({
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
        loop: true,
        config: { duration: 1000 },
    })
    return (  <animated.div style={spinning}>
        <IoIosSync size={100} />
      </animated.div> );
}
 
export default Spinner;