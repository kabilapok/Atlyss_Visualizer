const defaultState = ({
  nick: '',
  class: 'Novice',
  race: 'poon',
  level: { min: 1, max: 32}
});


const profileData = {
  classes: [
   { name: 'Fighter', icon: '/images/misc/Fighter_(Icon).png' },
   { name: 'Mystic', icon: '/images/misc/Mystic_(Icon).png' },
   { name: 'Bandit', icon: '/images/misc/Bandit_(Icon).png' },
   { name: 'Novice', icon: '/images/misc/Novice_(Icon).png' },
  ],

  races: [
    { id: 'poon', label: 'Poon', icon: '/images/Race-icons/rcIco_poon.png' },
    { id: 'azora', label: 'Kubold', icon: '/images/Race-icons/rcIco_azora.png' },
    { id: 'byrdle', label: 'Byrdle', icon: '/images/Race-icons/rcIco_byrdle.png' },
    { id: 'chang', label: 'Chang', icon: '/images/Race-icons/rcIco_chang.png' },
    { id: 'imp', label: 'Imp', icon: '/images/Race-icons/rcIco_imp.png' },
  ],
};


export function profileFormat() {
  return { defaultState, profileData };
}
