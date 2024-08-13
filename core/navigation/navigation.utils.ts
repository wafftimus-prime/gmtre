import { Navigation, GmtreNavigationItem } from '@gmtre-core';

export function setupNavigation(conf: GmtreNavigationItem[]): Navigation {
  const _compactConf: GmtreNavigationItem[] = [];
  const _conf: GmtreNavigationItem[] = [];

  conf.forEach((item) => {
    if (Object.keys(item).includes('children')) {
      _conf.push({ ...item });
      _compactConf.push({
        ...item,
        type: item.type === 'group' ? 'aside' : item.type,
        tooltip: item.title,
        children: [],
      });
    } else {
      _conf.push(item);
      _compactConf.push({ ...item, tooltip: item.title });
    }
  });

  return {
    compact: _compactConf,
    default: conf,
    futuristic: _conf,
    horizontal: _conf,
  };
}
