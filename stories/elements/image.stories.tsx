import { text, array, boolean } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Artibox, Editable, createReactEditor, composeRenderElements, composeHandlers } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { IMAGE_TYPES, createReactImage } from '@artibox/slate-react/image';
import { imageDocgen } from './image.docgen';

export default {
  title: 'Elements/Image',
  subcomponents: imageDocgen
};

export const Example = () => {
  const types = (['figure', 'image', 'caption'] as const).reduce(
    (acc, key) => {
      const type = text(key, IMAGE_TYPES[key], 'types');
      acc[key] = type;
      return acc;
    },
    { ...IMAGE_TYPES }
  );
  const enableSizeSteps = boolean('enable', true, 'size steps');
  const sizeStepStrings = array('values', ['25', '50', '75'], ',', 'size steps');
  const sizeSteps = enableSizeSteps ? sizeStepStrings.map(s => +s).filter(s => !isNaN(s)) : undefined;
  const image = createReactImage({ types, sizeSteps });
  const createHandlers = composeHandlers([image.createHandlers()]);
  const renderElement = composeRenderElements([image.createRenderElement()]);
  const initialValues: Node[] = [
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        }
      ]
    },
    {
      type: image.types.figure,
      width: 100,
      children: [
        {
          type: image.types.image,
          src:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAA1CAYAAABMS3mcAAAFQElEQVR4Ae2a+1NVVRTH/Yd4x/shaUAjJC8FvcCloMlH4BN8lIggZJGIZDPlODVoOaZRkkkZk4MS2TjOiIpRzfRLpYaPEQNFe8ys5rucs+cO9zLee885V5u+P5y55+yz9zqXvT77s/a5w5x7D/4RHpwDNxiY40ZQxiSsYIBw0dyuVS7CRbgIF0vtf6/U0lw0F81Fc9Fcrq0CwkW4CBfLrGGAey7CYGBwujoQLsJFuJxeVYzn/h6O5qK5aC6axn3TOD3HNBfNRXM5vaoYz30T0lw0F81F07hvGqfnmOaiuWgup1cV47lvQpqL5qK5aBr3TeP0HNNcNNf/x1xT039JRWWVLFnqEZz/cmVcdnZ2yf4PDro2CU6vWMZ7aFlHzHVq6FuJiorSo6v7rZAgeL/ngOzd9578cfeBjrszdV/y8p6VnJwcuTM5LSOXvte4i8vKQorLBD/+MuoIXK9uaVIA4uLiJD+/ICQIkpNTdOyt25Nm3OS9PwUHACFcjx+ScBeqbbhgnPT0DCkrK5e6+lUKysjFywaUu/f/lsLCIqms8srJwSEpXbRYVqyskyvXbojXWy0xMTE6BqXw3b37dFxRUbHgmAkXDOnxVKjVmltaZWJy2jwH8RoaN8rT8+ZJRkaGvLRsuYz9+LPeHzw9LEXFJfJCTa2BtqW1TduOfnbcxAh3Ejku8AKwDdfA14MKx56335GPjvTqecebnSZh2DehZCYkPCWZmZmSmpoq9fWr5der1xUgC66FCwtld/ceHRcdHS04fOHKzMqSpORkWbAgX+Mh5pamZu0DwAsKntP2rLlzTZ+UlBT57dp1AeBLPR69f+hwr1y6/IPGxxiUYcIRGA6782Ibrg0bN2vSUL6QSECRm5tnEmbBBRg6d+32S2agshgILozv//IrjXvs+Bf6zPj4eLk1MSUff9Kn1zAkrlFSYUeM6di5S8ecvzCqlszJzZVly1fovdPfnDHf0+5Ecrw/oLbgQlmCHbKzs7XMXf39ppSWLtLEnT03oomz4AIw4zcn/JIZLFxp6en69ogkAh5r3OjYT7LjjQ59Zvtrr5v4Bw8d1jaAZCUepRTA4Vjf0Gjarfv89AfEzpzYgqv/xIBJlpU067OtfYcmz4IrNjY2YDItSHw39IHMNX/+M2Y8yhzKJJ4FY7Zub9fzzq5u0+fTvs+1raam1rT17P/QfN/WtnbTbmcCOXZ2IG3BtWbtek0WNtL4LQrH1uYWbcPGGmAFCxf2YFaiAsEFkLBXQh+UOFxbNuw58BCaKm+1idG0dZv22dayXdtQstPS0gSQomxjr3dhdMz0t57Nz9lhCXVuwoYLe5vExESJT0gQX+sAJmzckfzhM2cfCVdN7YvaF2+O2EvhDwgEV1JSkm7o165rEJwj/sqX67T/+I3b+oaINsRZtXqNxgBAKJuI2bhhk4450ntU+o7167mnolI3+6FOGvsHB2DYcFkJ8t3TWJO+afMrmjzscR5lLmyqAQTeJmEbxAgEF8obfmzF2ybue6uf11/vrWeeO39Rf1oAYDhgqBMDJzXe0PB32lZcUqLfB2W1vHyJtuEN14rBz+CgCXaewoYr2AcE2w8QBtMX/XxNOXMMXhpQAn3bARMO3zacz9Y+sx+vw4PuiYGLCQwvgU/yvBEu/leEn9GdApZwES7C5dRqYpzIlV+ai+aiuWicyBnHqbmmuWgumsup1cQ4kTMgzUVz0Vw0TuSM49Rc01w0F83l1GpinMgZkOaiuWguGidyxnFqrmkumovmcmo1MU7kDEhz0Vw0F40TOeM4Ndf/AoDQGkFeZ2CwAAAAAElFTkSuQmCC',
          children: [{ text: '' }]
        },
        {
          type: image.types.caption,
          children: [{ text: 'caption' }]
        }
      ]
    },
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        }
      ]
    }
  ];

  const Editor = () => {
    const [value, setValue] = useState(initialValues);
    const editor = useMemo(() => image.with(createReactEditor()), []);
    const handlers = useMemo(() => createHandlers(editor), [editor]);

    return (
      <Artibox editor={editor} theme={THEME_ARTIBOX} onChange={setValue} value={value}>
        <Editable {...handlers} className="stories__editable stories__custom-elements" renderElement={renderElement} />
      </Artibox>
    );
  };

  return <Editor />;
};
