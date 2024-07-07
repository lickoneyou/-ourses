const { Worker } = require('worker_threads')

const workerThreadsFn = (array) => {
  return new Promise((res, rej) => {
    const worker = new Worker('./worker.js', {
      workerData: {
        array,
      },
    })

    worker.on('message', (msg) => {
      res(msg)
    })
  })
}

// fork

const { fork } = require('child_process')

const forkProcessFn = (array) => {
  return new Promise((res, rej) => {
    const forkProcess = fork('./fork.js', array)
    forkProcess.send({ array })
    forkProcess.on('message', (msg) => {
      res(msg)
    })
  })
}

const main = async () => {
  performance.mark('start')
  const res = await Promise.all([
    workerThreadsFn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    forkProcessFn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  ])
  console.log(res)
  performance.mark('end')
  performance.measure('checkPerformance', 'start', 'end')
  console.log(performance.getEntriesByName('checkPerformance').pop())
}

main()
