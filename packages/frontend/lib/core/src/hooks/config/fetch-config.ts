import {Config} from '@instinct-prj/interface';
import {createFetchHook} from '../fetch-hook.base';
import {configService} from '../../services/config';

export const useFetchConfig = () =>
  createFetchHook<Config>(configService.getConfig);
