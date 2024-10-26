"use client";
import { useRef } from "react";

export default function Home() {
	const audioRef = useRef<HTMLAudioElement>(null);

	function play() {
		if (audioRef.current) {
			audioRef.current.play();
		}
	}

	return (
		<div className="col">
			<button onClick={play}>Click</button>
			<audio
				ref={audioRef}
				src="ukelele.mp3"></audio>
		</div>
	);
}
