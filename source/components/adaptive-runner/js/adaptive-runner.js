export class AdaptiveRunner {
  constructor() {
    this.tracks = document.querySelectorAll('[data-adaptive-runner="track"]');
    this.checkpointActiveClassName = 'is-active';

    this.rObserverTracks = null;
    this.rObserverCheckpoint = null;

    this.onCheckpointClick = this.onCheckpointClick.bind(this);
    this.init();
  }

  init() {
    if (!this.tracks) {
      return;
    }

    this.tracks.forEach((track) => {
      this.renderRunner(track);
      this.addResizeObservers(track);
      track.addEventListener('click', this.onCheckpointClick);

      const runner = track.querySelector('[data-adaptive-runner="runner"]');
      const checkpoint = track.querySelector(`[data-adaptive-runner="checkpoint"].${this.checkpointActiveClassName}`);
      this.run(track, checkpoint, runner);
    });
  }

  templateRunner() {
    return (
      `<div class="adaptive-runner" data-adaptive-runner="runner">
        <div class="adaptive-runner__inner"></div>
      </div>`
    );
  }

  renderRunner(track) {
    const newElement = document.createElement('div');
    newElement.innerHTML = this.templateRunner();
    track.prepend(newElement.firstChild);
  }

  scrollTrackToCheckpoint(track, checkpoint) {
    const offsetTop = checkpoint.offsetTop - (track.offsetHeight / 2) + (checkpoint.offsetHeight / 2);
    const offsetLeft = checkpoint.offsetLeft - (track.offsetWidth / 2) + (checkpoint.offsetWidth / 2);

    track.scrollTo({
      top: offsetTop,
      left: offsetLeft,
      behavior: 'smooth',
    });
  }

  run(track, checkpoint, runner) {
    const runnerInner = runner.querySelector('.adaptive-runner__inner');
    const checkpointWidth = checkpoint.getBoundingClientRect().width.toFixed(2);
    const checkpointHeight = checkpoint.getBoundingClientRect().height.toFixed(2);

    runner.style.width = `${checkpointWidth}px`;
    runner.style.height = `${checkpointHeight}px`;
    runnerInner.style.width = `${checkpointWidth}px`;
    runnerInner.style.height = `${checkpointHeight}px`;

    const top = `${checkpoint.offsetTop}px`;
    const left = `${checkpoint.offsetLeft}px`;

    runner.style.transform = `translate3d(${left}, ${top} , 0)`;
    this.scrollTrackToCheckpoint(track, checkpoint);
  }

  addResizeObservers(track) {
    const checkpoints = track.querySelectorAll('[data-adaptive-runner="checkpoint"]');

    this.rObserverTracks = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const trackEntry = entry.target;
        const checkpointEntry = trackEntry.querySelector(`[data-adaptive-runner="checkpoint"].${this.checkpointActiveClassName}`);
        const runnerEntry = trackEntry.querySelector('[data-adaptive-runner="runner"]');

        // Отключает скачки анимации
        runnerEntry.classList.add('no-transition');
        setTimeout(() => {
          runnerEntry.classList.remove('no-transition');
        }, 150);

        this.run(trackEntry, checkpointEntry, runnerEntry);
      });
    });

    this.rObserverCheckpoint = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const checkpointEntry = entry.target;

        if (checkpointEntry.classList.contains(this.checkpointActiveClassName)) {
          const trackEntry = checkpointEntry.closest('[data-adaptive-runner="track"]');
          const runnerEntry = trackEntry.querySelector('[data-adaptive-runner="runner"]');

          this.run(trackEntry, checkpointEntry, runnerEntry);
        }
      });
    });

    this.rObserverTracks.observe(track);
    checkpoints.forEach((checkpoint) => {
      this.rObserverCheckpoint.observe(checkpoint);
    });
  }

  onCheckpointClick(evt) {
    const track = evt.currentTarget;
    const checkpoint = evt.target.closest(`[data-adaptive-runner="checkpoint"]:not(.${this.checkpointActiveClassName})`);

    if (!checkpoint) {
      return;
    }

    const runner = track.querySelector('[data-adaptive-runner="runner"]');
    this.run(track, checkpoint, runner);
  }
}
