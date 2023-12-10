export class SpeechRecognitionAPI {
	readonly #speechRecognitionInstance: SpeechRecognition
	#speechTranscript: string = ''

	constructor (settings?: SpeechRecognitionSettings) {
		const SpeechRecognitionConstructor =
			globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition

		if (!SpeechRecognitionConstructor) {
			throw new Error('SpeechRecognition API is not available')
		}

		this.#speechRecognitionInstance = new SpeechRecognitionConstructor()

		Object.assign(this.#speechRecognitionInstance, settings ?? {})
	}

	#parsePunctuationMarks (): string { return '' }

	#removeSpacesFromPunctuationMarks (): string { return '' }

	public start (): void {
		this.#speechTranscript = ''

		this.#speechRecognitionInstance.start()
	}

	public stop (): void {
		this.#speechTranscript = ''

		this.#speechRecognitionInstance.stop()
	}

	public abort (): void {
		this.#speechTranscript = ''

		this.#speechRecognitionInstance.abort()
	}

	public connect (callback: () => void): void {}
}
