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

	function pause() {
		if (audioRef.current) {
			audioRef.current.pause();
		}
	}

	return (
		<div className="col">
			<Button onClick={play}>play</Button>
			<Button onClick={pause}>pause</Button>
			<span></span>
			<audio
				ref={audioRef}
				src="Scarlet Fire - Otis McDonald.mp3"></audio>
		</div>
	);
}
