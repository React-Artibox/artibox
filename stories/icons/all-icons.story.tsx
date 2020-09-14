import React from 'react';
import { Icon } from '@artibox/components';
import * as icons from '@artibox/icons';

const allIcons: icons.IconDefinition[] = Object.keys(icons)
  .sort()
  .map(key => (icons as any)[key]);

export function AllIconsStory() {
  return (
    <div className="all-icons-story">
      {allIcons.map(icon => (
        <div key={icon.name} className="all-icons-story__icon-container">
          <div>
            <Icon icon={icon} />
          </div>
          {icon.name}
        </div>
      ))}
    </div>
  );
}

AllIconsStory.storyName = 'All';
