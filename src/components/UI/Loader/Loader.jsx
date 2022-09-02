import classes from './Loader.module.css';

const Loader = () => {
    return (
        <>
            <div className={classes.loader}>

            </div>
            <div style={{ position: 'absolute' }}>Загрузка</div>
        </>
    );
}

export default Loader;