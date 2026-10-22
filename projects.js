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
