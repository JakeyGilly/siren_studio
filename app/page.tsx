"use client";
import { Button } from "@/components/Button";
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
			<Button onClick={play}>Click</Button>
			<audio
				ref={audioRef}
				src="ukelele.mp3"></audio>
		</div>
	);
}
