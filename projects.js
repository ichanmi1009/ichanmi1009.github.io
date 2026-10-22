window.PORTFOLIO = {
  owner: '이찬미',
  email: 'cd06274@naver.com',
  github: 'https://github.com/ichanmi1009',
  notion: 'https://app.notion.com/p/RTL-Design-Verification-3c5e09982689801a9467fec95a7e0140',
  projects: [
    {
      slug: 'can-adas', title: 'CAN 기반 ADAS 차량 제어 시스템',
      category: '차량 · SoC', filter: 'vehicle', period: '2026.09 — 2026.10', featured: true,
      summary: 'CAN RX RTL과 STM32 VCU Firmware를 연결해 인식 결과가 실제 차량 제어로 이어지는 통신·제어 경로를 구현했습니다.',
      role: 'CAN RX RTL 설계 · Bit Timing 개선 · STM32 VCU CAN Firmware',
      tags: ['Verilog', 'CAN 2.0', 'STM32', 'Zynq', 'AXI4-Lite'],
      highlights: ['80 MHz / 500 kbps / 16 TQ를 기준으로 CAN RX 구현', 'Hard Sync·Resync의 공통 Timing 기준 정리', 'VCU HAL / Driver / Application 계층 구성'],
      award: '온디바이스 AI 과정 최종 프로젝트 경진대회 대상',
      context: 'CNN·영상처리 기반 ADAS 인식 결과를 CAN 통신으로 전달하고, VCU와 Motor ECU를 연동해 차량의 속도·정지·회전 제어를 수행하는 팀 프로젝트입니다. 주요 구현 내용은 FPGA CAN RX RTL과 STM32 VCU의 CAN Firmware이며, 전체 데이터 경로를 고려해 모듈 간 인터페이스를 맞췄습니다.',
      problems: [
        {label: '비트 타이밍 불일치', text: 'Hard Sync와 Resync가 서로 다른 Timing 기준을 참조하면서 Sample Point가 흔들릴 수 있는 구조를 확인했습니다.'},
        {label: '제어 흐름 복잡도', text: '수신 데이터 처리, 이벤트 판단, 모터 명령 송신이 연속되는 경로에서 계층별 책임과 처리 순서의 구분이 필요했습니다.'}
      ],
      steps: [
        {heading: 'CAN 수신 경로 모듈화', text: 'rx_sync → tq_gen → bit_timing → destuffer → frame FSM → CRC-15 → rx_buffer 순서로 수신 동작을 분리했습니다.'},
        {heading: '공통 Timing 기준 정리', text: '80 MHz Clock에서 500 kbps / 16 TQ 조건을 계산하고 Hard Sync·Resync가 같은 TQ Tick을 기준으로 동작하도록 정리했습니다.'},
        {heading: 'VCU Firmware 계층화', text: 'STM32에서 HAL / Driver / Application으로 기능을 분리하고 CAN 수신·상태 판단·모터 명령 전송의 책임을 구분했습니다.'},
        {heading: '차량 제어 시나리오 검증', text: '인지 결과에 따라 속도 변경, 정지, 차선 기반 조향 명령이 이어지는 시스템 동작을 확인했습니다.'}
      ],
      deepLeftTitle: 'Bit Timing 기준을 하나로',
      deepLeftIntro: '한 비트는 2.000 μs, 16 TQ 조건입니다. Hard Sync와 Resync의 기준 Tick이 다르면 수신 Sampling 시점이 어긋날 수 있습니다.',
      comparisons: [
        ['기준 Clock', '모듈별 Timing 해석', '80 MHz 기준을 명시'],
        ['TQ 생성', '독립 Tick 참조', '공통 TQ Tick 사용'],
        ['동기화', 'Hard Sync·Resync 기준 분리', '동일 Timing 기준으로 정리'],
        ['Bit Time', '2.125 μs 이탈 사례', '2.000 μs 규격 기준']
      ],
      deepRightTitle: 'VCU Firmware의 역할 분리',
      layers: [
        ['L3', 'Application', 'ADAS 결과 해석 · 상태 관리 · 차량 제어 이벤트'],
        ['L2', 'Driver', 'CAN 메시지 송수신 · RX/TX 처리 · 데이터 변환'],
        ['L1', 'HAL', 'CAN Controller Register · GPIO · Timer']
      ],
      results: [
        {value: '2.000 μs', label: '규격 기준 Bit Time', detail: '500 kbps에 해당하는 비트 길이'},
        {value: '16 TQ', label: 'Bit Timing', detail: 'Hard Sync·Resync 공통 기준'},
        {value: '대상', label: '최종 프로젝트', detail: '온디바이스 AI 과정 경진대회'}
      ],
      takeaway: '통신 프로토콜을 구현할 때는 개별 블록의 기능뿐 아니라 공통 Timing 기준과 모듈 간 경계를 먼저 정의하는 것이 중요하다는 것을 확인했습니다. 이후에는 데이터가 전달되는 전체 경로를 먼저 정리하고, RTL과 Firmware 각각에서 검증 가능한 단위로 설계하는 방식을 적용하고 있습니다.',
      verification: ['CAN Frame의 Stuff / Form / CRC Error 처리 구조 확인', 'Hard Sync·Resync 동기화 동작 검토', 'ADAS ECU → VCU → Motor ECU 제어 시나리오 연동'],
      architecture: ['영상 인식 / ADAS ECU', 'CAN Bus', 'FPGA CAN RX', 'STM32 VCU', 'Motor ECU']
    },
    {
      slug: 'fpga-adas-isp', title: 'FPGA 기반 ADAS ISP SoC', category: '차량 · SoC', filter: 'vehicle',
      period: '2026.08 — 2026.09', featured: true,
      summary: '카메라 영상에 Red Detection ISP를 구현하고 AXI4-Lite 주변장치와 연결해 영상 처리 데이터를 시스템에서 활용했습니다.',
      role: 'Red Detect ISP · ROI / Red Decoder · Gaussian Blur',
      tags: ['SystemVerilog', 'FPGA', 'ISP', 'AXI4-Lite', 'OV7670'],
      highlights: ['Red Detection 1-bit Binary 데이터 처리', 'ROI·Red Decoder 영상 경로 구성', '카메라–ISP–SoC 데이터 경로 연동'],
      context: 'FPGA에서 카메라 입력을 처리하고 결과를 SoC 주변장치와 연결하는 ADAS ISP 프로젝트입니다. 담당 기능은 Red Detect ISP와 ROI, Red Decoder 및 Gaussian Blur 구현입니다.',
      steps: [{heading:'영상 입력 정리',text:'카메라 데이터의 유효 신호와 Pixel 흐름을 분석했습니다.'},{heading:'영상 필터링',text:'색상 기반 검출과 Gaussian Blur를 구성했습니다.'},{heading:'검출 결과 연결',text:'ROI·Red Decoder 결과를 시스템에서 활용할 수 있도록 경로를 정리했습니다.'}],
      verification: ['영상 입력–필터–출력 데이터 경로 점검', 'FPGA에서 Red Detection 동작 확인'],
      takeaway:'Pixel 유효 구간과 모듈 간 지연을 함께 관리해야 영상 처리 결과의 정렬을 유지할 수 있음을 확인했습니다.',
      architecture:['OV7670', 'Pixel Capture', 'ISP / ROI', 'AXI4-Lite', 'Output']
    },
    {
      slug: 'spi-i2c-uvm', title: 'SPI · I2C RTL 설계 및 UVM 검증', category:'검증 · UVM', filter:'verification',
      period:'2026.06.11 — 2026.06.18', featured:true,
      summary:'SPI·I2C Master/Slave RTL을 설계하고 Transaction 기반 UVM 환경으로 프로토콜 동작을 검증했습니다.',
      role:'SPI / I2C RTL · UVM Testbench · Scoreboard / Coverage',
      tags:['SystemVerilog','UVM 1.2','SPI','I2C','VCS'],
      highlights:['SPI Master/Slave Transaction 검증', 'I2C Slave READ / WRITE 확인', '정의한 Functional Coverage 100% 달성'],
      context:'Serial Protocol Master/Slave의 기능을 구현하고 UVM 기반 재사용 가능한 테스트벤치로 정상 동작을 확인했습니다.',
      steps:[{heading:'RTL 설계',text:'SPI·I2C의 Clock/데이터 전송 순서를 FSM과 Shift Register로 구성했습니다.'},{heading:'검증 환경 구성',text:'Sequence, Driver, Monitor, Scoreboard를 통해 예상값과 관측값을 비교했습니다.'},{heading:'커버리지 점검',text:'READ / WRITE 및 프로토콜 시나리오별 Functional Coverage를 확인했습니다.'}],
      verification:['SPI 검증 PASS / FAIL 866 / 0 사례', 'I2C Slave WRITE / READ PASS', '정의된 Functional Coverage 100%'],
      takeaway:'PASS 여부뿐 아니라 어떤 조건과 전이를 검증했는지 함께 정의하는 것이 검증 품질을 결정한다는 점을 확인했습니다.',
      architecture:['RTL DUT','UVM Driver','Monitor','Scoreboard','Coverage']
    },
    {
      slug:'ov7670-vga',title:'OV7670 Camera — BRAM — VGA 데이터 경로',category:'FPGA · 영상',filter:'fpga',
      period:'2026.08.13 — 2026.08.21',
      summary:'카메라 픽셀을 BRAM에 저장해 VGA로 출력하는 영상 데이터 경로를 Zynq-7000에서 구현했습니다.',
      role:'Camera Pixel Capture · BRAM · VGA Timing',tags:['SystemVerilog','Zynq-7000','BRAM','VGA','SCCB'],
      highlights:['PCLK / HREF / VSYNC 기반 Pixel Capture', 'Dual-Port BRAM ↔ VGA 영상 출력', 'BRAM Read Latency 고려'],
      context:'OV7670 카메라 입력을 FPGA 메모리에 저장하고 VGA 동기 신호에 맞춰 화면에 출력하는 프로젝트입니다.',
      steps:[{heading:'카메라 입력',text:'PCLK·HREF·VSYNC를 이용해 유효 픽셀을 수집했습니다.'},{heading:'영상 저장',text:'픽셀을 BRAM 주소에 대응시켜 저장했습니다.'},{heading:'VGA 출력',text:'BRAM Read Latency와 VGA 동기 신호를 고려해 출력 순서를 맞췄습니다.'}],
      verification:['QVGA 320 × 240 데이터 경로 실험', 'RGB444 / RGB565 및 테스트 패턴 검토'],
      takeaway:'영상 파이프라인에서는 데이터 자체뿐 아니라 valid와 주소의 시점까지 정렬해야 합니다.',architecture:['OV7670','Pixel Capture','BRAM','VGA Timing','Display']
    },
    {
      slug:'axi-soc',title:'AXI4-Lite SoC Peripheral 통합',category:'차량 · SoC',filter:'vehicle',period:'2026.06.21 — 2026.06.30',
      summary:'GPIO·Timer·UART·SPI 주변장치를 AXI4-Lite Register Map으로 통합하고 C Firmware와 연결했습니다.',
      role:'AXI4-Lite IP · Register Map · Bare-metal C',tags:['AXI4-Lite','MicroBlaze','C','Vivado','Vitis'],
      highlights:['AXI4-Lite Register Map 구성', 'Custom Peripheral IP 통합', 'MicroBlaze App–Driver–HAL 연동'],
      context:'Processor가 주변장치를 Register로 제어할 수 있도록 AXI4-Lite 인터페이스와 Bare-metal Firmware를 연결한 SoC 프로젝트입니다.',
      steps:[{heading:'Address Map 설계',text:'Control/Status Register의 주소와 접근 동작을 정의했습니다.'},{heading:'IP Integration',text:'GPIO·Timer·UART·SPI 주변장치를 SoC Bus에 연결했습니다.'},{heading:'SW 연동',text:'Vitis에서 Driver와 Application을 통해 Register를 제어했습니다.'}],
      verification:['Register Read / Write 기능 점검', 'Peripheral Loopback 동작 확인'],
      takeaway:'SoC 동작은 RTL 인터페이스와 SW Register 규약이 일치해야 완성된다는 점을 확인했습니다.',architecture:['MicroBlaze','AXI4-Lite','Register Map','Peripheral','Firmware']
    },
    {
      slug:'jetson-ai',title:'Jetson Orin Nano 온디바이스 AI 파이프라인',category:'온디바이스 AI',filter:'ai',period:'2026.08.05 — 2026.08.19',
      summary:'Jetson Orin Nano에서 YOLO11과 MiVOLO를 구동하고 검출·추적 결과를 Web UI로 확인하는 파이프라인을 구성했습니다.',
      role:'Inference Pipeline · Tracking · Web UI',tags:['Jetson Orin Nano','YOLO11','MiVOLO','Web UI'],
      highlights:['YOLO11 / MiVOLO 추론 구성', 'Jetson On-Device 실행 환경', '결과 확인용 Web UI 연동'],
      context:'Edge Device에서 영상 추론 결과를 시각화하는 온디바이스 AI 프로젝트입니다.',
      steps:[{heading:'실행 환경',text:'Jetson Orin Nano의 추론 환경을 구성했습니다.'},{heading:'추론 흐름',text:'Detection 및 Tracking 결과를 연결했습니다.'},{heading:'가시화',text:'Web UI에서 추론 결과를 확인하도록 구성했습니다.'}],
      verification:['Jetson 환경에서 추론 파이프라인 실행', 'Web UI 결과 표시 확인'],
      takeaway:'모델 출력이 사용 가능한 시스템 정보가 되려면 전처리와 후처리, UI 경로를 함께 고려해야 합니다.',architecture:['Camera / Video','YOLO11','Tracking','MiVOLO','Web UI']
    },
    {
      slug:'stm32-keymatrix-pir',title:'CMSIS KeyMatrix · PIR 센서 제어',category:'Firmware',filter:'fpga',period:'2026.07.23 — 2026.07.27',
      summary:'STM32에서 CMSIS Register 접근과 HAL을 비교하며 Key Matrix와 PIR 센서를 Bare-metal로 제어했습니다.',
      role:'STM32 Register / HAL · Key Matrix · PIR',tags:['STM32','CMSIS','HAL','Bare-metal'],
      highlights:['CMSIS Register / HAL 구현', 'Key Matrix 스캔 처리', 'PIR 센서 입력 확인'],
      context:'MCU 주변장치를 Register 단위와 HAL 두 방식으로 다뤄보며 제어 계층의 차이를 익힌 프로젝트입니다.',
      steps:[{heading:'GPIO 설정',text:'핀 모드와 입력·출력 동작을 구성했습니다.'},{heading:'스캔 로직',text:'Key Matrix 스캔으로 키 상태를 읽었습니다.'},{heading:'센서 처리',text:'PIR 신호를 읽고 이벤트를 처리했습니다.'}],
      verification:['키 입력 스캔 동작', 'PIR 센서 이벤트 처리'],
      takeaway:'상위 API뿐 아니라 내부 Register 설정을 이해해야 주변장치 동작을 추적하기 쉽습니다.',architecture:['GPIO Input','CMSIS / HAL','Key Scan','PIR Input','Application']
    },
    {
      slug:'rv32i-cpu',title:'RV32I 37명령 Single-Cycle CPU',category:'RTL · CPU',filter:'rtl',period:'2026.05.19 — 2026.05.27',
      summary:'RV32I 명령어 37개를 지원하는 단일 사이클 CPU를 Datapath와 Control Unit 중심으로 설계했습니다.',
      role:'Single-Cycle CPU · Datapath · Control Unit',tags:['SystemVerilog','RISC-V','Basys3','CPU'],
      highlights:['RV32I 37개 명령 디코딩', 'Datapath / Control Unit 설계', 'Basys3 타깃 RTL 구현'],
      context:'RV32I Instruction 처리 경로를 설계하며 CPU 내부의 Control과 Datapath 상호작용을 확인했습니다.',
      steps:[{heading:'명령어 분류',text:'Opcode와 명령어 형식에 따라 Control Signal을 정의했습니다.'},{heading:'Datapath 구성',text:'Register File, ALU 및 PC 경로를 설계했습니다.'},{heading:'제어부 연결',text:'Decoder 결과를 각 연산 경로와 연결했습니다.'}],
      verification:['RV32I 37개 명령어 지원 범위 점검', 'Single-Cycle 데이터 흐름 분석'],
      takeaway:'명령어 한 개의 처리도 여러 하위 블록의 정확한 조합으로 완성된다는 점을 배웠습니다.',architecture:['Instruction','Decoder','Register File','ALU','Writeback']
    },
    {
      slug:'uart-fifo-uvm',title:'SystemVerilog UART · FIFO 클래스 검증',category:'검증 · UVM',filter:'verification',period:'2026.05.12 — 2026.05.18',
      summary:'UART·FIFO DUT를 Class 기반 검증 환경으로 구성해 재사용 가능한 테스트벤치를 만들었습니다.',
      role:'Generator · Driver · Monitor · Scoreboard',tags:['SystemVerilog','OOP','UART','FIFO'],
      highlights:['Generator / Driver / Monitor / Scoreboard 구성', 'UART·FIFO 시나리오 검증', 'Class 기반 검증 환경 분리'],
      context:'UART/FIFO 기능을 모듈별 관측과 비교로 검증하는 Testbench 설계 프로젝트입니다.',
      steps:[{heading:'Transaction 정의',text:'입출력 데이터와 제어 항목을 Transaction으로 구성했습니다.'},{heading:'Driver / Monitor',text:'입력 자극과 DUT 출력을 분리해 수집했습니다.'},{heading:'Scoreboard',text:'기대 출력과 관측 결과를 비교했습니다.'}],
      verification:['UART/FIFO 기능 시나리오 검증', 'Class 기반 Testbench 모듈 간 동작 확인'],
      takeaway:'검증 코드도 역할을 분리하면 수정과 재사용이 쉬워집니다.',architecture:['Generator','Driver','UART / FIFO','Monitor','Scoreboard']
    },
    {
      slug:'uart-fifo-sensor',title:'UART · FIFO 기반 PC–FPGA 센서 연동',category:'FPGA · 영상',filter:'fpga',period:'2026.05.01 — 2026.05.06',
      summary:'DHT11·HC-SR04 센서 값을 FPGA에서 받아 UART·FIFO로 PC에 전송하는 데이터 경로를 구성했습니다.',
      role:'Sensor Interface · UART / FIFO · PC Link',tags:['SystemVerilog','UART','FIFO','Basys3'],
      highlights:['DHT11 / HC-SR04 센서 인터페이스', 'UART·FIFO 데이터 경로', 'PC–FPGA 통신 확인'],
      context:'센서 입력부터 FIFO 저장과 UART 송신까지 연속된 FPGA 데이터 경로를 다룬 프로젝트입니다.',
      steps:[{heading:'센서 수집',text:'온습도·거리 센서의 입력을 처리했습니다.'},{heading:'버퍼링',text:'FIFO로 데이터 흐름을 완충했습니다.'},{heading:'PC 송신',text:'UART로 수집 값을 전달했습니다.'}],
      verification:['센서 데이터 전송 경로 확인', 'PC Terminal 수신 확인'],
      takeaway:'서로 다른 속도의 블록은 버퍼를 통해 데이터 흐름을 안정적으로 연결할 수 있습니다.',architecture:['DHT11 / HC-SR04','Sensor Interface','FIFO','UART TX','PC']
    },
    {
      slug:'uart-loopback',title:'UART 9600bps Hardware Loopback',category:'RTL · CPU',filter:'rtl',period:'2026.04.23 — 2026.04.27',
      summary:'9600 bps UART RX/TX를 16배 Oversampling으로 구현하고 PC–FPGA Loopback 동작을 확인했습니다.',
      role:'UART RX / TX RTL · Sampling · Loopback',tags:['SystemVerilog','UART','Basys3','9600 bps'],
      highlights:['RX·TX 16배 Oversampling', '9600 bps / 8N1 Frame 처리', 'PC–FPGA Hardware Loopback'],
      context:'UART의 Start, Data, Stop Bit 처리와 Clock 기준 Sampling을 직접 구현한 기초 RTL 프로젝트입니다.',
      steps:[{heading:'Baud Timing',text:'Clock을 분주해 9600 bps 수신·송신 기준을 만들었습니다.'},{heading:'RX Sampling',text:'16배 Oversampling으로 수신 Data Bit를 판정했습니다.'},{heading:'Loopback',text:'수신 데이터를 다시 송신하도록 연결했습니다.'}],
      verification:['9600 bps 8N1 UART Frame 확인', 'PC–FPGA Hardware Loopback 검증'],
      takeaway:'샘플링 시점을 정확히 정의하는 것이 Serial 통신 구현의 출발점임을 확인했습니다.',architecture:['PC UART','FPGA RX','FIFO / Data','FPGA TX','PC UART']
    },
    {
      slug:'fpga-stopwatch',title:'FPGA Stopwatch · Watch',category:'RTL · CPU',filter:'rtl',period:'2026.04.16 — 2026.04.20',
      summary:'Counter와 FSM, 7-Segment를 조합해 스톱워치와 시계 모드가 전환되는 FPGA 회로를 설계했습니다.',
      role:'Counter · FSM · 7-Segment Display',tags:['SystemVerilog','FSM','7-Segment','Basys3'],
      highlights:['Counter / FSM 설계', '7-Segment 표시 제어', 'Stopwatch / Watch 모드 전환'],
      context:'FPGA의 기본 순차회로와 상태 전이를 실제 보드 Display에 연결한 프로젝트입니다.',
      steps:[{heading:'Clock / Counter',text:'시간 기준 Counter를 구성했습니다.'},{heading:'FSM',text:'시계와 스톱워치 모드 상태를 정의했습니다.'},{heading:'Display',text:'7-Segment에 현재 상태와 값을 표시했습니다.'}],
      verification:['Stopwatch 동작 확인', '모드 전환과 표시 동작 확인'],
      takeaway:'간단한 UI도 시간 기준과 상태 전이를 분명히 정의해야 예측 가능하게 동작합니다.',architecture:['Clock','Counter','FSM','7-Segment','Display']
    }
  ]
};


// 기술 상세: 원본 노션 설계 기록과 실보드/검증 근거를 기반으로 작성
window.PORTFOLIO.technicalDetails = {
  "can-adas": {
    "focus": "CAN 수신 비트 복원 → Frame 무결성 확인 → VCU Event 처리 → Motor ECU 제어 명령. 시스템 경로를 끊지 않고 각 단계의 책임을 분리했습니다.",
    "spec": [
      [
        "Clock / Bitrate",
        "80 MHz / 500 kbps",
        "1bit = 2.000 μs"
      ],
      [
        "TQ 구성",
        "BRP=9, TSEG1=13, TSEG2=2, SJW=2",
        "125 ns × 16 TQ, Sample Point 87.5%"
      ],
      [
        "Frame / CRC",
        "CAN 2.0A Base ID 11-bit, CRC-15 (0x4599)",
        "Destuffing, ACK, Stuff/Form/CRC Error"
      ],
      [
        "VCU 제어주기",
        "10 ms Main Task / 100 ms Heartbeat 점검",
        "RX ISR과 차량 제어 처리 분리"
      ]
    ],
    "implementation": [
      {
        "title": "CAN RX RTL / 수신 경로",
        "items": [
          "2-FF Sync → 공용 TQ Generator / Bit Timing → Destuffer → Frame FSM → CRC-15 → RX Buffer로 분리했습니다.",
          "SOF, ID(11), RTR·IDE·R0, DLC, DATA, CRC, ACK, EOF/IFS를 상태별로 해석하고, SOF~DATA의 Destuffing된 비트를 CRC 계산에 사용했습니다.",
          "rx_idle과 실제 TX Level을 Timing 판단에 반영하며 Hard Sync 시 BRP Counter까지 함께 초기화했습니다."
        ]
      },
      {
        "title": "AXI4-Lite / Register Interface",
        "items": [
          "CAN_BTR(0x00): BRP/TSEG1/TSEG2/SJW, CAN_CR(0x04): TX Start/Reset, CAN_SR(0x08): Status/Interrupt Clear를 구분했습니다.",
          "TX Mailbox/Data 0x0C~0x14, RX Mailbox/Data 0x18~0x20를 두고 frame_done 시 RX 데이터와 상태를 저장했습니다.",
          "CAN_SR의 RX Interrupt 상태는 W1C 방식으로 Software에서 해제하도록 정의했습니다."
        ]
      },
      {
        "title": "VCU / Firmware Event 처리",
        "items": [
          "RX ISR에서는 Frame을 Queue에 적재하고, Main Superloop에서 CAN_ProcessRx → ADAS Event → Motor Command → CAN_ProcessTx 순으로 처리했습니다.",
          "Green·Red·30·70·방지턱·차선 좌표를 Event로 변환했습니다. 차선 중심 좌표는 PD 제어를 거쳐 좌·우 Motor 명령에 반영합니다.",
          "HAL은 CAN Controller Register, Driver는 송수신/Queue, Application은 상태·우선순위·차량 제어 판단을 담당합니다."
        ]
      },
      {
        "title": "안전 상태와 제어 우선순위",
        "items": [
          "Heartbeat·Fault를 100 ms Task에서 점검하고 유효한 Timeout 또는 Fault가 발생하면 Safe Stop을 Latch하도록 구성했습니다.",
          "Safety Override는 일반 ADAS Event보다 우선하며, Emergency Stop과 두 Motor의 STOP 명령을 우선 Queueing합니다.",
          "ADAS Simulation 단계에서는 실제 미연결 ADAS ECU의 Timeout을 Mask해 검증 조건을 구분했습니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "자기 송신 Edge가 Positive Resync를 유발",
        "cause": "송신 Dominant(0) Edge가 RX Falling Edge로 관측되면서 불필요한 Resync가 적용됐습니다.",
        "action": "RX/TX 공통 Bit Timing을 유지하면서 RX Idle 및 실제 TX Level을 이용해 자기 Edge에 대한 Resync 조건을 수정했습니다.",
        "result": "이탈했던 Bit Time 2.125 μs를 500 kbps 기준인 2.000 μs로 복원했습니다."
      },
      {
        "issue": "CRC Sequence–Delimiter 경계 오류",
        "cause": "수신 CRC 비교와 Delimiter 상태 전이에서 정상 Frame이 Error Flag로 전이하던 이력이 있었습니다.",
        "action": "CRC 15bit 수신 시점, CRC 비교, Delimiter의 Recessive 확인 조건을 상태별로 확인했습니다.",
        "result": "현재 RTL에서는 RX_CRC_DELIMITER에서도 destuff_en=1인 점을 그대로 명시합니다. 일반 CAN 규격 설명과 실제 구현 상태를 혼동하지 않습니다."
      }
    ],
    "checks": [
      [
        "Simulation / 파형",
        "Hard Sync·Resync와 2.000 μs Bit Time 확인",
        "RTL Timing"
      ],
      [
        "CAN 수신 경로",
        "Frame Parsing·Destuffing·CRC/ACK/Error 구조 검토",
        "11-bit Base Frame 중심"
      ],
      [
        "실물 ECU 연동",
        "ADAS Result Simulation Frame → VCU → Motor1·2 ECU Command 경로 확인",
        "ADAS ECU 전체 실물 연동과 구분"
      ]
    ],
    "scope": "현재 공개 설명의 검증 범위는 ADAS 결과를 Simulation Frame으로 주입하고 실제 Motor1·2 ECU를 연결한 단계입니다. Extended Identifier 18-bit Parsing은 CAN RX 구현 범위에 포함되지 않습니다.",
    "source": "https://app.notion.com/p/ae2e09982689826c8961811262cdf51b"
  },
  "fpga-adas-isp": {
    "focus": "카메라 1프레임을 여러 영상 처리 경로로 전달하면서 Red 객체 검출 결과를 단일 UART 명령으로 변환했습니다.",
    "spec": [
      [
        "입력 영상",
        "OV7670 / QVGA 320 × 240",
        "RGB565 Pixel 기반"
      ],
      [
        "Red Threshold",
        "R≥18, G≤24, B≤12",
        "RGB565 성분 비교 후 1-bit Binary"
      ],
      [
        "검출 조건",
        "Bounding Box 가로·세로 ≥10 px",
        "중심 X=100~200, Y=80~160"
      ],
      [
        "제어 명령",
        "0xFF STOP / UART 115200 bps",
        "Lane 좌표와 STOP 전송 우선순위 분리"
      ]
    ],
    "implementation": [
      {
        "title": "Red Detect ISP",
        "items": [
          "red_filter → r_frame_buffer → Gaussian 3×3 → ROI → red_decoder 데이터 경로를 구성했습니다.",
          "ROI가 min/max X·Y 좌표를 누적하고 Decoder가 Bounding Box 크기와 중심 좌표를 계산해 유효 객체를 판별했습니다.",
          "Red 객체 존재 시 0xFF STOP을 요청하고, WAIT_UNRED State에서 객체가 사라질 때까지 불필요한 재송신·재출발을 방지했습니다."
        ]
      },
      {
        "title": "SoC / UART Interface",
        "items": [
          "Custom AXI4-Lite UART IP를 MicroBlaze와 연계하여 RXNE·TC Sticky Flag와 Software W1C Clear를 정의했습니다.",
          "UART 데이터는 0x01~0xFE 차선 좌표, 0xFF 정지 명령으로 구분하고 충돌하는 좌표 값은 0xFE로 치환했습니다.",
          "동일 시점에 차선과 STOP이 발생하면 STOP을 우선 전달하도록 Arbitration 기준을 정의했습니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "Camera 입력 Noise가 Sobel False Edge로 전파",
        "cause": "일부 Frame에서 카메라 입력의 가로 방향 Noise가 Edge 결과와 차선 X좌표까지 전파됐습니다.",
        "action": "센서 입력 전원·Clock을 점검하고 0.1 µF Decoupling 및 XCLK 22 Ω Series Resistor를 적용했습니다.",
        "result": "PCLK 파형과 Sobel 출력 화면의 전·후 비교에서 Noise와 False Edge 영향 완화를 확인했습니다."
      },
      {
        "issue": "정지 직후 재주행 반복",
        "cause": "Red STOP을 생성한 뒤 FSM이 IDLE로 복귀하면 동일 객체에 대해 정지·재주행 판단이 반복됐습니다.",
        "action": "WAIT_UNRED State를 추가해 Red 객체가 검출되는 동안 STOP 상태를 유지했습니다.",
        "result": "유효 Red 객체 지속 시 제어 상태를 유지하도록 FSM 전이를 수정했습니다."
      }
    ],
    "checks": [
      [
        "개인 구현",
        "Red Filter, Frame Buffer, ROI, Decoder, AXI UART IP",
        "RTL·Register Interface"
      ],
      [
        "전체 시스템",
        "Red Detect → UART → MicroBlaze → Step Motor 정지 제어",
        "팀 통합 검증"
      ],
      [
        "영상 처리",
        "OV7670 320×240 입력 및 Sobel/Red 병렬 처리",
        "팀 통합 검증"
      ]
    ],
    "scope": "Sobel 차선 인식과 최종 Step Motor 제어는 팀 전체 경로이며, 주요 구현 내용은 Red Detect ISP와 Custom AXI4-Lite UART IP입니다.",
    "source": "https://app.notion.com/p/8d0e0998268983d589080183fe895ef1"
  },
  "spi-i2c-uvm": {
    "focus": "UVM Scoreboard가 양방향 데이터를 자동 대조하고, Coverage로 실제로 확인한 프로토콜 조건을 수치화했습니다.",
    "spec": [
      [
        "SPI",
        "Mode 0, Master↔Slave",
        "상승 Edge Sample · 하강 Edge 갱신"
      ],
      [
        "I2C",
        "START / Address / ACK / READ·WRITE / STOP",
        "Slave Address 및 ACK 판단"
      ],
      [
        "시뮬레이션",
        "VCS / SystemVerilog UVM",
        "Transaction–Monitor–Scoreboard 구조"
      ]
    ],
    "implementation": [
      {
        "title": "검증 환경 설계",
        "items": [
          "Sequence Item은 전송 Byte, Clock Divider 등 입력 조건을 정의하고 Driver가 DUT를 구동하도록 구성했습니다.",
          "Monitor는 완료 시점을 기준으로 실제 데이터를 수집해 Analysis Port로 Scoreboard와 Coverage에 전달했습니다.",
          "SPI의 MOSI/MISO를 양방향 비교하고 I2C WRITE·READ는 각각 수신 데이터와 기대값을 비교했습니다."
        ]
      },
      {
        "title": "테스트 시나리오",
        "items": [
          "SPI Fast(div 2~4) 402건, Normal(8~32) 247건, Slow(64~255) 217건으로 Divider 영역을 나눴습니다.",
          "I2C는 WRITE 782건, READ 782건을 검증하고 Address·R/W·ACK/NACK 및 경계값 커버리지를 확인했습니다.",
          "실물 Basys 3·Logic Analyzer에서 SPI SCLK/MOSI/MISO/SS_n 및 RAM Write/Read 경로를 점검했습니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "I2C START를 인식하지 못해 Driver 대기",
        "cause": "Reset 해제 전에 명령이 구동되어 m_done이 발생하지 않았습니다.",
        "action": "Reset 이후 Clocking Block 기준 1주기를 기다린 다음 cmd_start를 인가했습니다.",
        "result": "START→주소→ACK→DATA→STOP 시퀀스를 정상 검증했습니다."
      },
      {
        "issue": "SPI Edge와 MOSI/MISO 데이터 시점 불일치",
        "cause": "Half Tick의 적용 구간과 Edge별 역할이 분리되지 않아 Sampling 시점이 밀렸습니다.",
        "action": "상승 Edge Sample, 하강 Edge Data Update로 역할을 분리하고 Half Tick을 DATA State에서만 사용했습니다.",
        "result": "RTL 파형과 Logic Analyzer의 전송 Timing을 확인했습니다."
      }
    ],
    "checks": [
      [
        "SPI Master→Slave / Slave→Master",
        "각 866 PASS · FAIL 0",
        "검증 카운트"
      ],
      [
        "I2C WRITE / READ",
        "각 782 PASS · FAIL 0",
        "총 1,564건"
      ],
      [
        "Functional Coverage",
        "SPI·I2C 각 100%",
        "정의한 Coverage 항목 기준"
      ]
    ],
    "scope": "Coverage 100%는 정의된 Functional Coverage의 달성률이며 프로토콜의 모든 가능한 오류 상황을 검증했다는 뜻은 아닙니다.",
    "source": "https://app.notion.com/p/2cee0998268983288d0b01e780c1a52e",
    "github": "https://github.com/ichanmi1009/UVM_SPI_I2C_Verification"
  },
  "ov7670-vga": {
    "focus": "Pixel Data와 VGA Sync가 서로 다른 Clock Domain 및 BRAM Read Latency를 거치더라도 같은 화면 좌표를 가리키도록 정렬했습니다.",
    "spec": [
      [
        "카메라 Frame",
        "320 × 240 QVGA",
        "PCLK/HREF/VSYNC"
      ],
      [
        "VGA 출력",
        "640 × 480",
        "2배 좌표 매핑"
      ],
      [
        "Address 산식",
        "((y≫1)×320)+(x≫1)",
        "Framebuffer Read"
      ],
      [
        "Memory",
        "Dual-Port BRAM",
        "PCLK Write / VGA Read 분리"
      ]
    ],
    "implementation": [
      {
        "title": "Frame Buffer / Sync 정렬",
        "items": [
          "PCLK와 HREF로 유효 Pixel Byte를 수집하고 2 Byte Pixel을 RGB 형식으로 조립했습니다.",
          "VGA의 640×480 Active 영역 좌표를 절반으로 축소해 320×240 BRAM Read Address로 변환했습니다.",
          "BRAM 1-Clock Read Latency에 맞춰 DE·HSYNC·VSYNC를 지연시켜 RGB Data와 같은 Pixel을 나타내게 했습니다."
        ]
      },
      {
        "title": "PS–PL 카메라 제어",
        "items": [
          "Zynq PS의 C Application → AXI4-Lite Register → SCCB IP → OV7670 Camera Register 순으로 초기화를 제어했습니다.",
          "Camera Address/Write/Read/Trigger/DONE·BUSY 및 RESET/PWDN/capture_en Register 항목을 구성했습니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "ILA에서 BRAM Write Enable이 관찰되지 않음",
        "cause": "카메라 Pixel Capture는 PCLK Domain인데 ILA는 다른 Clock으로 Sampling하고 있었습니다.",
        "action": "ILA Sample Clock을 PCLK으로 전환하고 VSYNC Rising Edge Trigger 및 HREF 구간을 점검했습니다.",
        "result": "Write Enable과 Pixel Data 변화를 관찰했습니다."
      },
      {
        "issue": "검은 화면과 BRAM 1-Clock 출력 지연",
        "cause": "VGA 출력 문제와 카메라 초기화 문제를 구분해야 했고, BRAM RGB Data가 Sync보다 한 Clock 늦을 수 있었습니다.",
        "action": "BRAM test.mem 패턴으로 VGA 경로를 먼저 분리 검증하고 동기 신호를 Read Latency만큼 지연했습니다.",
        "result": "VGA 경로 확인 후 카메라·SCCB 단계로 원인 범위를 좁혔습니다."
      }
    ],
    "checks": [
      [
        "Standalone VGA",
        "test.mem Pattern 정상 출력",
        "BRAM→VGA 단위"
      ],
      [
        "카메라 캡처",
        "PCLK/HREF·BRAM Write Enable 관찰",
        "ILA"
      ],
      [
        "PS–PL 연동",
        "SCCB Register 제어 및 C Application 연동",
        "통합 경로"
      ]
    ],
    "scope": "하드웨어 Clock Domain과 Sync 정렬을 설명한 페이지이며, SCCB 예외 처리의 전체 검증을 모두 완료했다는 의미는 아닙니다.",
    "source": "https://app.notion.com/p/c7ae099826898398ac70014c3debeb27"
  },
  "axi-soc": {
    "focus": "AXI4-Lite Register 접근을 공통 제어 인터페이스로 사용하면서 SPI Transaction의 Command·Address는 Software, Signal Timing은 Hardware로 분리했습니다.",
    "spec": [
      [
        "Processor / Bus",
        "MicroBlaze / AXI4-Lite",
        "Memory-mapped Peripheral"
      ],
      [
        "SPI Register",
        "SR 0x00 / TDR 0x04 / RDR 0x08 / CR 0x0C",
        "BUSY·DONE / TX·RX / START"
      ],
      [
        "SPI Mode",
        "CPOL=0 · CPHA=0",
        "Mode 0 고정"
      ],
      [
        "SPI Slave RAM",
        "Address 0x00~0x03",
        "Stopwatch Data Write/Read"
      ]
    ],
    "implementation": [
      {
        "title": "SoC Bus / Peripheral 통합",
        "items": [
          "GPIO·Timer·UART·SPI의 Control/Status Register를 AXI4-Lite 주소 공간에 배치했습니다.",
          "C Application이 Command→Address→Data를 전송하고 SPI Master Core가 SCLK/MOSI/SS_n 신호를 생성하도록 책임을 분리했습니다.",
          "GPIO UVM Scoreboard에서 Byte Strobe·방향 설정·핀 값을 반영한 기대값을 비교했습니다."
        ]
      },
      {
        "title": "Firmware–RTL 검증 데이터 경로",
        "items": [
          "TDR Write → CR Start → SR Polling → RDR Read로 SPI 1 Byte Transaction을 수행했습니다.",
          "Stopwatch 데이터를 Slave RAM 0x00~0x03에 기록한 뒤 재수신하여 Vitis Terminal에 출력했습니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "SPI Read 시 주소와 관계없이 0x00만 반환",
        "cause": "Slave RAM Read Address가 실시간 수신값 read_data에 연결돼 Dummy Byte 수신 시 주소가 0x00으로 변경됐습니다.",
        "action": "ram[read_data] 참조를 Transaction 동안 유지되는 ram[addr]로 변경했습니다.",
        "result": "Logic Analyzer로 0x00~0x03 Write/Read Data 일치, Vitis Terminal 재출력을 확인했습니다."
      }
    ],
    "checks": [
      [
        "SPI Write / Read",
        "Address 0x00~0x03 데이터 일치",
        "Logic Analyzer"
      ],
      [
        "Software 통합",
        "Stopwatch 값 00:00:10.02 재수신 출력",
        "Vitis Terminal"
      ],
      [
        "GPIO UVM",
        "정의한 Coverage 100%",
        "Address·Direction·WSTRB 등"
      ]
    ],
    "scope": "검증 값은 본 프로젝트에서 사용한 Address와 Test Scenario의 결과입니다.",
    "source": "https://app.notion.com/p/dc4e09982689838bb2640120416487ff",
    "github": "https://github.com/ichanmi1009/AXI_Peripheral"
  },
  "jetson-ai": {
    "focus": "Jetson의 On-Device 추론 출력을 실제 사용자에게 보이는 Result Pipeline으로 연결했습니다.",
    "implementation": [
      {
        "title": "Detection / 추론 파이프라인",
        "items": [
          "Jetson Orin Nano에서 YOLO11 및 MiVOLO 추론 환경을 구성했습니다.",
          "추론 결과의 탐지·추적 값을 Web UI에 전달해 영상과 함께 확인하도록 구성했습니다."
        ]
      },
      {
        "title": "구현 점검",
        "items": [
          "모델 실행과 Tracking 출력, Web UI 시각화 경로를 각각 확인했습니다.",
          "정확도·지연시간의 정량 성능이 확인되지 않은 항목은 수치로 표시하지 않았습니다."
        ]
      }
    ],
    "checks": [
      [
        "On-Device 실행",
        "Jetson에서 추론 파이프라인 동작 확인",
        "수행 환경"
      ],
      [
        "결과 가시화",
        "추론·추적 정보 Web UI 표시",
        "시스템 UI"
      ]
    ],
    "scope": "정량 FPS·정확도 데이터는 별도 증빙이 확인되기 전까지 기재하지 않았습니다."
  },
  "stm32-keymatrix-pir": {
    "focus": "동일 주변장치를 CMSIS Register 직접 접근과 HAL API로 다루어 추상화 계층에 따른 차이를 확인했습니다.",
    "implementation": [
      {
        "title": "GPIO 및 Key Matrix",
        "items": [
          "핀 Direction/Pull과 Input Data를 설정하고 Key Matrix의 Row/Column Scan으로 키 값을 판별했습니다.",
          "Key Scan 주기와 입력 변화가 Application에 전달되는 경로를 구성했습니다."
        ]
      },
      {
        "title": "PIR Sensor 제어",
        "items": [
          "PIR 센서 입력 이벤트를 GPIO 기반으로 읽고 제어 로직에 전달했습니다.",
          "Register 접근과 HAL API 양쪽에서 동일 이벤트 흐름을 비교했습니다."
        ]
      }
    ],
    "checks": [
      [
        "Key Scan",
        "키 입력 상태 감지",
        "실물 MCU"
      ],
      [
        "PIR Event",
        "감지 입력과 이벤트 처리",
        "STM32"
      ]
    ],
    "scope": "센서 반응 시간 등 측정하지 않은 정량 지표는 포함하지 않았습니다.",
    "github": "https://github.com/ichanmi1009/STM32-SmartDoorLock"
  },
  "rv32i-cpu": {
    "focus": "Instruction Decode 결과가 Register File·ALU·PC Update·Writeback MUX를 제어하는 경로를 Single-Cycle 구조로 통합했습니다.",
    "implementation": [
      {
        "title": "CPU Datapath",
        "items": [
          "PC → Instruction Decode → Register File → ALU → Writeback 경로를 구성했습니다.",
          "Opcode와 Instruction Format에 따라 ALU Control, Register Write, Branch/Jump 선택 신호를 분리했습니다."
        ]
      },
      {
        "title": "명령어 검증",
        "items": [
          "37개 지원 Instruction의 연산 및 Data 이동 경로를 테스트했습니다.",
          "Control Path에서 선택 신호가 바뀌면 Datapath 결과가 어떻게 달라지는지 Waveform으로 추적했습니다."
        ]
      }
    ],
    "checks": [
      [
        "ISA 범위",
        "RV32I 37개 명령 지원",
        "구현 범위"
      ],
      [
        "RTL 설계",
        "Single-Cycle Datapath / Decoder 연결",
        "SystemVerilog"
      ]
    ],
    "scope": "Pipelined CPU나 전체 RISC-V 확장은 구현 범위에 포함하지 않았습니다.",
    "github": "https://github.com/ichanmi1009/RV32I_singlecycle"
  },
  "uart-fifo-uvm": {
    "focus": "Class 기반 Testbench에서 자극 생성·구동·관측·기대값 비교의 책임을 분리했습니다.",
    "implementation": [
      {
        "title": "Testbench Data Flow",
        "items": [
          "Generator가 Transaction을 생성하고 Driver가 UART/FIFO 입력 자극으로 변환합니다.",
          "Monitor는 실제 DUT 입출력을 관찰하고 Scoreboard로 전달해 기대 결과와 비교합니다."
        ]
      },
      {
        "title": "검증 항목",
        "items": [
          "FIFO Push/Pop과 UART 송수신 데이터 경로를 단계별로 점검했습니다.",
          "구체적인 Coverage 100%를 측정한 프로젝트와 혼동하지 않고 Class 기반 검증 결과로 구분했습니다."
        ]
      }
    ],
    "checks": [
      [
        "Class Testbench",
        "Generator / Driver / Monitor / Scoreboard 경로 구성",
        "SystemVerilog"
      ],
      [
        "UART / FIFO",
        "송수신·저장 데이터 비교",
        "Simulation"
      ]
    ],
    "scope": "UVM 기반 SPI·I2C 프로젝트와 달리 이 항목은 Class-based Verification 중심입니다.",
    "github": "https://github.com/ichanmi1009/SystemVerilog_Verification"
  },
  "uart-fifo-sensor": {
    "focus": "서로 다른 입력 주기를 갖는 센서 데이터를 FIFO로 완충한 뒤 UART로 PC에 출력했습니다.",
    "implementation": [
      {
        "title": "Sensor Interface",
        "items": [
          "DHT11 온습도와 HC-SR04 거리 센서의 입력 값을 FPGA에서 읽습니다.",
          "센서의 서로 다른 데이터 생성 타이밍을 공통 Buffer 경로에 연결했습니다."
        ]
      },
      {
        "title": "FIFO · UART",
        "items": [
          "센서 결과를 FIFO에 적재하고 UART TX가 순서대로 PC Terminal에 전달하도록 구성했습니다.",
          "수신 값과 실제 센서 상태가 연동되는지 PC에서 확인했습니다."
        ]
      }
    ],
    "checks": [
      [
        "센서 수신",
        "DHT11 / HC-SR04 입력 처리",
        "Basys3"
      ],
      [
        "통신 경로",
        "FIFO → UART → PC Terminal",
        "Hardware 확인"
      ]
    ],
    "scope": "센서 정밀도·측정 오차에 대한 정량 평가값은 제공된 자료에 없어 기재하지 않았습니다.",
    "github": "https://github.com/ichanmi1009/UART-FIFO-SENSOR-stopwatch_watch"
  },
  "uart-loopback": {
    "focus": "16× Oversampling으로 UART Bit 중앙을 Sampling하고, 수신한 Byte를 송신기로 되돌리는 전체 경로를 확인했습니다.",
    "spec": [
      [
        "UART 설정",
        "9600 bps / 8N1",
        "Start 1 · Data 8 · Stop 1"
      ],
      [
        "RX Sampling",
        "16× Oversampling",
        "Start 검출 후 Data Bit 중심 Sample"
      ]
    ],
    "implementation": [
      {
        "title": "UART RX / TX FSM",
        "items": [
          "Start Bit 검출 후 Bit 중앙 Sample을 기준으로 8 Data Bit를 Shift하여 Byte를 복원했습니다.",
          "TX는 같은 Baud 설정으로 Start–Data–Stop Frame을 생성합니다."
        ]
      },
      {
        "title": "Hardware Loopback",
        "items": [
          "PC → FPGA UART RX → UART TX → PC로 즉시 되돌려주는 연결을 구현했습니다.",
          "FPGA 실물에서 전송 Byte와 수신 Byte가 일치하는지 확인했습니다."
        ]
      }
    ],
    "checks": [
      [
        "Frame / Baud",
        "9600 bps 8N1",
        "RTL"
      ],
      [
        "PC↔FPGA",
        "Hardware Loopback 데이터 일치 확인",
        "보드 테스트"
      ]
    ],
    "scope": "UART 송수신 기능 중심이며 복합 프로토콜 에러 주입이나 장시간 BER 측정 결과를 주장하지 않았습니다.",
    "github": "https://github.com/ichanmi1009/UART_LOOPBACK"
  },
  "fpga-stopwatch": {
    "focus": "동일한 Clock 기준에서 Counter로 시간을 생성하고 FSM으로 시계·스톱워치의 상태 전환을 제어했습니다.",
    "implementation": [
      {
        "title": "Timebase / Counter",
        "items": [
          "FPGA System Clock을 이용해 시간 갱신 Tick을 만들고 자리올림 Counter를 구현했습니다.",
          "시·분·초 데이터를 표시부에서 사용할 형식으로 전달합니다."
        ]
      },
      {
        "title": "FSM / 표시 제어",
        "items": [
          "Stopwatch / Watch Mode에 따라 시간 증가 및 표시 경로를 선택합니다.",
          "7-Segment Scan과 출력 데이터를 연결하여 Basys 3에서 표시합니다."
        ]
      }
    ],
    "checks": [
      [
        "FSM",
        "Mode 전환",
        "RTL"
      ],
      [
        "7-Segment",
        "Time Count 출력",
        "Basys3"
      ]
    ],
    "scope": "추가적인 Stopwatch 정확도 측정치나 별도 Timing Closure 지표는 표시하지 않았습니다.",
    "github": "https://github.com/ichanmi1009/stopwatch-watch"
  }
};


// 공개 저장소의 원본 RTL/Logic Analyzer/Verification 캡처를 그대로 표시합니다.
window.PORTFOLIO.waveforms = {
  "can-adas": {
    "note": "CAN Hard Sync·Resync, CRC Delimiter 디버깅 파형은 Notion 원본에 있습니다. 해당 이미지의 공개 파일 주소를 확보하지 못해 임의 파형이나 합성 이미지를 대신 게시하지 않았습니다.",
    "links": [
      {
        "title": "Hard Sync · Resync 파형 원본",
        "url": "https://app.notion.com/p/5d0e099826898393a606818e23cc082b"
      },
      {
        "title": "CAN RX CRC · Error 디버깅 파형 원본",
        "url": "https://app.notion.com/p/825e0998268983fb883c815ad5eb9f46"
      }
    ]
  },
  "spi-i2c-uvm": {
    "images": [
      {
        "title": "SPI Master/Slave Logic Analyzer — READ",
        "caption": "SCLK · MOSI · MISO · SS_n 신호를 관측한 실제 SPI Read 파형",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UVM_SPI_I2C_Verification/main/docs/images/spi_logic_analyzer_read.png"
      },
      {
        "title": "SPI Master/Slave Logic Analyzer — WRITE",
        "caption": "실제 FPGA 보드의 SPI Write 신호",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UVM_SPI_I2C_Verification/main/docs/images/spi_logic_analyzer_write.png"
      },
      {
        "title": "SPI UVM Coverage",
        "caption": "SPI UVM Functional Coverage 결과",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UVM_SPI_I2C_Verification/main/docs/images/spi_coverage.png"
      },
      {
        "title": "SPI UVM Scoreboard",
        "caption": "SPI TX/RX Scoreboard 검증 출력",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UVM_SPI_I2C_Verification/main/docs/images/spi_scoreboard.png"
      },
      {
        "title": "I2C Logic Analyzer — READ",
        "caption": "I2C Read Transaction 실제 관측 파형",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UVM_SPI_I2C_Verification/main/docs/images/i2c_logic_analyzer_read.png"
      },
      {
        "title": "I2C Logic Analyzer — WRITE",
        "caption": "I2C Write Transaction 실제 관측 파형",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UVM_SPI_I2C_Verification/main/docs/images/i2c_logic_analyzer_write.png"
      },
      {
        "title": "I2C UVM Coverage",
        "caption": "I2C UVM Functional Coverage 결과",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UVM_SPI_I2C_Verification/main/docs/images/i2c_coverage.png"
      },
      {
        "title": "I2C UVM Scoreboard",
        "caption": "I2C READ/WRITE Scoreboard 검증 출력",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UVM_SPI_I2C_Verification/main/docs/images/i2c_scoreboard.png"
      }
    ]
  },
  "axi-soc": {
    "images": [
      {
        "title": "SPI AXI Peripheral Simulation",
        "caption": "Custom SPI IP의 AXI4-Lite 인터페이스 동작 파형",
        "src": "https://raw.githubusercontent.com/ichanmi1009/AXI_Peripheral/main/docs/images/spi_axi_simulation.png"
      },
      {
        "title": "SPI Read Logic Analyzer",
        "caption": "Slave RAM 주소와 수신 데이터 검증에 사용한 실제 SPI Read 파형",
        "src": "https://raw.githubusercontent.com/ichanmi1009/AXI_Peripheral/main/docs/images/spi_read_logic_analyzer.png"
      },
      {
        "title": "SPI Write Logic Analyzer",
        "caption": "Master–Slave SPI Write 검증 파형",
        "src": "https://raw.githubusercontent.com/ichanmi1009/AXI_Peripheral/main/docs/images/spi_write_logic_analyzer.png"
      },
      {
        "title": "GPIO UVM Verification",
        "caption": "GPIO UVM 기반 Register·I/O 검증 자료",
        "src": "https://raw.githubusercontent.com/ichanmi1009/AXI_Peripheral/main/docs/images/gpio_uvm_verification.png"
      }
    ]
  },
  "rv32i-cpu": {
    "images": [
      {
        "title": "R-Type Instruction Simulation",
        "caption": "RV32I R-Type Data Path 시뮬레이션",
        "src": "https://raw.githubusercontent.com/ichanmi1009/RV32I_singlecycle/main/docs/images/r_type_simulation.png"
      },
      {
        "title": "Store Instruction Simulation",
        "caption": "Store 명령어와 Write Data / Address 동작 시뮬레이션",
        "src": "https://raw.githubusercontent.com/ichanmi1009/RV32I_singlecycle/main/docs/images/store_simulation.png"
      },
      {
        "title": "JALR Instruction Simulation",
        "caption": "JALR 제어 흐름 시뮬레이션",
        "src": "https://raw.githubusercontent.com/ichanmi1009/RV32I_singlecycle/main/docs/images/jalr_simulation.png"
      }
    ]
  },
  "uart-fifo-uvm": {
    "images": [
      {
        "title": "UART RX 파형",
        "caption": "UART RX 데이터 비트 수신 및 완료 시점",
        "src": "https://raw.githubusercontent.com/ichanmi1009/SystemVerilog_Verification/main/assets/uart-rx-waveform.png"
      },
      {
        "title": "UART TX 파형",
        "caption": "UART TX 시작·데이터·종료 동작",
        "src": "https://raw.githubusercontent.com/ichanmi1009/SystemVerilog_Verification/main/assets/uart-tx-waveform.png"
      },
      {
        "title": "UART RX FIFO",
        "caption": "UART 수신 데이터의 FIFO 연결 과정",
        "src": "https://raw.githubusercontent.com/ichanmi1009/SystemVerilog_Verification/main/assets/uart-rx-fifo-waveform.png"
      },
      {
        "title": "Class-based Loopback 검증",
        "caption": "Loopback 동작 시뮬레이션",
        "src": "https://raw.githubusercontent.com/ichanmi1009/SystemVerilog_Verification/main/assets/loopback-waveform.png"
      }
    ]
  },
  "uart-loopback": {
    "images": [
      {
        "title": "UART Loopback Simulation",
        "caption": "PC–FPGA UART Loopback의 실제 RTL 시뮬레이션",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UART_LOOPBACK/main/assets/loopback-simulation.png"
      },
      {
        "title": "UART RX Synchronizer",
        "caption": "비동기 RX 신호 2-FF Synchronizer 파형",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UART_LOOPBACK/main/assets/rx-synchronizer-simulation.png"
      },
      {
        "title": "UART TX Data Timing",
        "caption": "TX 데이터 전송 타이밍 파형",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UART_LOOPBACK/main/assets/tx-data-simulation.png"
      },
      {
        "title": "UART RX Done",
        "caption": "RX 완료 신호 동작",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UART_LOOPBACK/main/assets/rx-done-simulation.png"
      }
    ]
  },
  "uart-fifo-sensor": {
    "images": [
      {
        "title": "DHT11 Sensor RTL Simulation",
        "caption": "온습도 센서 입력 상태와 데이터 해석 시뮬레이션",
        "src": "https://raw.githubusercontent.com/ichanmi1009/UART-FIFO-SENSOR-stopwatch_watch/main/assets/dht11_simulation.png"
      }
    ]
  },
  "fpga-stopwatch": {
    "images": [
      {
        "title": "Stopwatch RTL Simulation",
        "caption": "스톱워치 FSM·Counter 동작 시뮬레이션",
        "src": "https://raw.githubusercontent.com/ichanmi1009/stopwatch-watch/main/assets/stopwatch-simulation.png"
      },
      {
        "title": "Watch RTL Simulation",
        "caption": "시계 Counter·표시 동작 시뮬레이션",
        "src": "https://raw.githubusercontent.com/ichanmi1009/stopwatch-watch/main/assets/watch-simulation.png"
      },
      {
        "title": "AM/PM Switching Simulation",
        "caption": "오전/오후 전환 상태 검증",
        "src": "https://raw.githubusercontent.com/ichanmi1009/stopwatch-watch/main/assets/am-pm-simulation.png"
      }
    ]
  }
};
