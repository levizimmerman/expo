import { StatusWaitingIcon } from '@expo/styleguide-icons';

import { IconBase, DocIconProps } from './IconBase';

export const PendingIcon = ({ small }: DocIconProps) => (
  <IconBase Icon={StatusWaitingIcon} className="text-icon-warning" small={small} />
);
