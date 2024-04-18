import BaseReactPlayer, { BaseReactPlayerProps } from './base';
import { DailyMotionConfig } from './players/dailymotion';
import { FacebookConfig } from './players/facebook';
import { FileConfig } from './players/file';
import { MixcloudConfig } from './players/mixcloud';
import { SoundCloudConfig } from './players/soundcloud';
import { TwitchConfig } from './players/twitch';
import { VidyardConfig } from './players/vidyard';
import { VimeoConfig } from './players/vimeo';
import { WistiaConfig } from './players/wistia';
import { YouTubeConfig } from './players/youtube';

export interface Config {
  soundcloud?: SoundCloudConfig;
  youtube?: YouTubeConfig;
  facebook?: FacebookConfig;
  dailymotion?: DailyMotionConfig;
  vimeo?: VimeoConfig;
  file?: FileConfig;
  wistia?: WistiaConfig;
  mixcloud?: MixcloudConfig;
  vidyard?: VidyardConfig;
  twitch?: TwitchConfig;
}

export interface ReactPlayerProps extends BaseReactPlayerProps {
  config?: Config;
}

export default class ReactPlayer extends BaseReactPlayer<ReactPlayerProps> {}
