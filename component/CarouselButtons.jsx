import { useCarousel } from "nuka-carousel";

function cls(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function CarouselButtons() {
    const { currentPage, totalPages, wrapMode, goBack, goForward } =
        useCarousel();

    const allowWrap = wrapMode === "wrap";
    const enablePrevNavButton = allowWrap || currentPage > 0;
    const enableNextNavButton = allowWrap || currentPage < totalPages - 1;

    const prevNavClassName = cls(
        "inline-block px-4 py-2 bg-pink-800 cursor-pointer invisible",
        enablePrevNavButton && "!visible",
    );

    const nextNavClassName = cls(
        "inline-block px-4 py-2 bg-pink-800 cursor-pointer invisible",
        enableNextNavButton && "!visible",
    );

    return (
        <div className="carouselButtons">
            <div className={prevNavClassName} onClick={goBack}>
                PREV
            </div>
            <div className={nextNavClassName} onClick={goForward}>
                NEXT
            </div>
        </div>
    );
}
