import logo from "../../assets/404.png";
const NoPage = () => {
    return (
        <div className="absolute -z-10 w-screen h-5/6 flex-grow flex flex-row justify-center select-none">
            <div className="h-full flex flex-col justify-center">
                <img src={logo} className="h-1/2 w-auto" alt={"404 - Page Not Found"} />
                <div className="text-5xl font-serif text-slate-800"> Page Not Found !</div>
            </div>
        </div>
    );
};

export default NoPage;
