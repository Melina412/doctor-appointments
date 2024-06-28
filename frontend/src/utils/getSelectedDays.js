// im utils ordner sollen noch weitere funktionen ausgelagert werden um die komponenten übersichtlicher zun machen (nicht fertig)

export function getSelectedDays(profileData) {
  console.log('getSelectedDays wurde aufgerufen');
  return {
    Monday: {
      checked: profileData?.visiting_hours?.Mon ? true : false,
      id: 'Mon',
      open: profileData?.visiting_hours?.Mon?.open || '',
      close: profileData?.visiting_hours?.Mon?.close || '',
    },
    Tuesday: {
      checked: profileData?.visiting_hours?.Tue ? true : false,
      id: 'Tue',
      open: profileData?.visiting_hours?.Tue?.open || '',
      close: profileData?.visiting_hours?.Tue?.close || '',
    },
    Wednesday: {
      checked: profileData?.visiting_hours?.Wed ? true : false,
      id: 'Wed',
      open: profileData?.visiting_hours?.Wed?.open || '',
      close: profileData?.visiting_hours?.Wed?.close || '',
    },
    Thursday: {
      checked: profileData?.visiting_hours?.Thu ? true : false,
      id: 'Thu',
      open: profileData?.visiting_hours?.Thu?.open || '',
      close: profileData?.visiting_hours?.Thu?.close || '',
    },
    Friday: {
      checked: profileData?.visiting_hours?.Fri ? true : false,
      id: 'Fri',
      open: profileData?.visiting_hours?.Fri?.open || '',
      close: profileData?.visiting_hours?.Fri?.close || '',
    },
    Saturday: {
      checked: profileData?.visiting_hours?.Sat ? true : false,
      id: 'Sat',
      open: profileData?.visiting_hours?.Sat?.open || '',
      close: profileData?.visiting_hours?.Sat?.close || '',
    },
    Sunday: {
      checked: profileData?.visiting_hours?.Sun ? true : false,
      id: 'Sun',
      open: profileData?.visiting_hours?.Sun?.open || '',
      close: profileData?.visiting_hours?.Sun?.close || '',
    },
  };
}
