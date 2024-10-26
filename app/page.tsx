"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRef, useState } from "react";

export default function Home() {
	const [audio, setAudio] = useState<string | null>(null);
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
		<div>
			<Input
				id="dropzone-file"
				type="file"
				placeholder="Upload an icon"
				className="h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
				onDragEnter={(e: DragEvent<HTMLInputElement>) => {
					e.preventDefault();
					e.stopPropagation();
					e.currentTarget.classList.add("border-blue");
				}}
				onDragOver={(e: DragEvent<HTMLInputElement>) => {
					e.preventDefault();
					e.stopPropagation();
					e.currentTarget.classList.add("border-blue");
				}}
				onDragLeave={(e: DragEvent<HTMLInputElement>) => {
					e.preventDefault();
					e.stopPropagation();
					e.currentTarget.classList.remove("border-blue");
				}}
				onDragEnd={(e: DragEvent<HTMLInputElement>) => {
					e.preventDefault();
					e.stopPropagation();
					e.currentTarget.classList.remove("border-blue");
				}}
				onDragExit={(e: DragEvent<HTMLInputElement>) => {
					e.preventDefault();
					e.stopPropagation();
					e.currentTarget.classList.remove("border-blue");
				}}
				onChange={async (e: ChangeEvent<HTMLInputElement>) => {
					e.preventDefault();
					e.stopPropagation();
					e.currentTarget.classList.remove("border-blue");
					if (!e.target.files) return;
					if (e.target.files.length != 1) return console.error("Only one file can be uploaded at a time.");
					if (e.target.files[0]!.type != "audio/mpeg" && e.target.files[0]!.type != "audio/ogg" && e.target.files[0]!.type != "audio/wav") return console.error("File must be a valid audio file.");
					const file = e.target.files[0];
					if (!file) return;
					const base64 = await toBase64(file);
					if (!base64) return;
					const input = document.getElementById("dropzone-file") as HTMLInputElement;
					input.files = e.target.files;
					setAudio(base64);
					console.log("audio", audio);
				}}
			/>
			<Button onClick={play}>play</Button>
			<Button onClick={pause}>pause</Button>
			<audio
				ref={audioRef}
				src={`data:audio/wav;base64,${audio}`}></audio>
		</div>
	);
}

function toBase64(file: File): Promise<string | null> {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.onerror = () => {
			resolve(null);
		};
		reader.readAsDataURL(file);
	});
}
