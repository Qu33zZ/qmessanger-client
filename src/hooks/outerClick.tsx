import {useEffect, useRef} from "react";

const useOuterClick = (callback:Function) => {
	const innerRef = useRef<any>();
	useEffect(
		() => {
			const listener = (event:MouseEvent | TouchEvent) => {
				// Do nothing if clicking ref's element or descendent elements
				if (!innerRef.current || innerRef.current.contains(event.target)) {
					return;
				}
				callback(event);
			};
			document.addEventListener("mousedown", listener);
			document.addEventListener("touchstart", listener);
			return () => {
				document.removeEventListener("mousedown", listener);
				document.removeEventListener("touchstart", listener);
			};
		}, [innerRef, callback]
	);

	return innerRef;
}
export default useOuterClick;