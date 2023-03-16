export const fontColor = (theme: 'dark' | 'light') => {
    return theme === 'dark' ? '#fff' : '#000000';
};

export const backgroundColor = (theme: 'dark' | 'light') => {
    return theme === 'dark' ? '#000000' : '#fff';
};

export const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
