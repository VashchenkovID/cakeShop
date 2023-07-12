import React from 'react';
interface IComponentProps {
    text: string;
    form?: 'default' | 'round' | 'defaultClear' | 'defaultBrick' | 'brick' | 'brickDefault' | 'brickClear' | 'brickRound' | 'roundClear' | 'roundBrick' | 'clearRound';
    size?: 's' | 'xs' | 'm' | 'l';
}
declare const Textarea: React.FC<IComponentProps>;
export default Textarea;
