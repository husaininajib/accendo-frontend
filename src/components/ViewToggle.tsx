import Switch from '@mui/material/Switch';

const ViewToggle = (props: { isCardView: boolean; handleToggle: () => void }) => {
    const { isCardView, handleToggle } = props;
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    // console.log(isCardView);
    return (
        <div>
            <span>Table</span>
            <Switch size="small" {...label} onChange={handleToggle} checked={isCardView} />
            <span>Card</span>
        </div>
    );
};

export default ViewToggle;
