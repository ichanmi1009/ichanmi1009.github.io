window.PORTFOLIO = {
  owner: '이찬미',
  email: 'cd06274@naver.com',
  github: 'https://github.com/ichanmi1009',
  notion: 'https://app.notion.com/p/RTL-Design-Verification-3c5e09982689801a9467fec95a7e0140',
  projects: [
    {
      slug: 'can-adas', title: 'CAN 기반 ADAS 차량 제어 시스템',
      category: '차량 · CAN RTL', filter: 'vehicle', period: '2026.09 — 2026.10', featured: true,
      summary: 'CAN RX RTL을 구현하고 Basys 3의 MicroBlaze VCU Firmware와 연동해 CAN 수신·이벤트 처리·STM32 Motor ECU 제어 흐름을 구성했습니다.',
      role: 'CAN RX RTL · 공통 Bit Timing · Basys 3 VCU Firmware',
      tags: ['Verilog', 'CAN 2.0A', 'Basys 3', 'MicroBlaze', 'Vitis C', 'STM32 Motor ECU'],
      highlights: ['CAN RX RTL: 80 MHz · 500 kbps · 16 TQ · CRC-15', 'Basys 3 MicroBlaze VCU: HAL / Driver / Application', 'STM32 Motor1·2 ECU로 CAN 제어 명령 전달'],
      award: '온디바이스 AI 과정 최종 프로젝트 경진대회 대상',
      context: 'Zynq Z7-20의 ADAS 인식 결과를 CAN으로 전달하고 Basys 3(MicroBlaze 기반 VCU)가 수신 Frame을 차량 제어 Event와 좌·우 Motor 명령으로 변환하는 팀 프로젝트입니다. Motor1·2 ECU는 STM32 기반입니다. 주요 구현 내용은 CAN RX RTL의 Timing·Frame·CRC 처리 및 Basys 3 VCU의 CAN HAL·Driver·Application입니다. 실제 VCU–Motor 검증에서는 ADAS 결과를 Simulation Frame으로 주입했습니다.',
      problems: [
        {label: '비트 타이밍 불일치', text: 'Hard Sync와 Resync가 서로 다른 Timing 기준을 참조하면서 Sample Point가 흔들릴 수 있는 구조를 확인했습니다.'},
        {label: '제어 흐름 복잡도', text: '수신 데이터 처리, 이벤트 판단, 모터 명령 송신이 연속되는 경로에서 계층별 책임과 처리 순서의 구분이 필요했습니다.'}
      ],
      steps: [
        {heading: 'CAN 수신 경로 모듈화', text: 'rx_sync → tq_gen → bit_timing → destuffer → frame FSM → CRC-15 → rx_buffer 순서로 수신 동작을 분리했습니다.'},
        {heading: '공통 Timing 기준 정리', text: '80 MHz Clock에서 500 kbps / 16 TQ 조건을 계산하고 Hard Sync·Resync가 같은 TQ Tick을 기준으로 동작하도록 정리했습니다.'},
        {heading: 'Basys 3 VCU Firmware 연동', text: 'Basys 3 FPGA의 MicroBlaze에서 Vitis Bare-metal C로 CAN HAL(Register 접근)·Driver(RX/TX Queue)·Application(ADAS Event·Motor Command)을 분리했습니다.'},
        {heading: 'VCU–Motor ECU 검증', text: 'ADAS 인식값을 Simulation Frame으로 주입한 뒤 Basys 3 VCU의 Event/PD 처리 결과를 STM32 Motor1·2 ECU로 전달하는 CAN 제어 경로를 검증했습니다.'}
      ],
      deepLeftTitle: 'Bit Timing 기준을 하나로',
      deepLeftIntro: '한 비트는 2.000 μs, 16 TQ 조건입니다. Hard Sync와 Resync의 기준 Tick이 다르면 수신 Sampling 시점이 어긋날 수 있습니다.',
      comparisons: [
        ['기준 Clock', '모듈별 Timing 해석', '80 MHz 기준을 명시'],
        ['TQ 생성', '독립 Tick 참조', '공통 TQ Tick 사용'],
        ['동기화', 'Hard Sync·Resync 기준 분리', '동일 Timing 기준으로 정리'],
        ['Bit Time', '2.125 μs 이탈 사례', '2.000 μs 규격 기준']
      ],
      deepRightTitle: 'Basys 3 MicroBlaze VCU Firmware',
      layers: [
        ['L3', 'Application', 'MicroBlaze C · ADAS Event · Lane PD · Safe Stop'],
        ['L2', 'Driver', 'CAN RX Interrupt · RX/TX Queue · Parser'],
        ['L1', 'HAL', 'AXI4-Lite CAN_BTR / CAN_CR / CAN_SR · RX/TX Mailbox']
      ],
      results: [
        {value: '2.000 μs', label: '규격 기준 Bit Time', detail: '500 kbps에 해당하는 비트 길이'},
        {value: '16 TQ', label: 'Bit Timing', detail: 'Hard Sync·Resync 공통 기준'},
        {value: '대상', label: '최종 프로젝트', detail: '온디바이스 AI 과정 경진대회'}
      ],
      takeaway: '통신 프로토콜을 구현할 때는 개별 블록의 기능뿐 아니라 공통 Timing 기준과 모듈 간 경계를 먼저 정의하는 것이 중요하다는 것을 확인했습니다. 이후에는 데이터가 전달되는 전체 경로를 먼저 정리하고, RTL과 Firmware 각각에서 검증 가능한 단위로 설계하는 방식을 적용하고 있습니다.',
      verification: ['CAN RX Hard Sync·Resync와 Stuff/Form/CRC Error 처리 검토', 'Basys 3 MicroBlaze VCU의 RX ISR → Queue → 10 ms Task 처리 흐름 확인', 'ADAS Simulation Frame → Basys 3 VCU → 실제 STM32 Motor1·2 ECU로 CAN Command 전달 확인'],
      architecture: ['Zynq Z7-20 · ADAS', 'CAN Bus', 'Basys 3 · CAN RX RTL', 'Basys 3 · MicroBlaze VCU', 'STM32 · Motor1/2 ECU']
    },
    {
      slug: 'fpga-adas-isp', title: 'FPGA 기반 ADAS ISP SoC', category: 'FPGA · ISP SoC', filter: 'vehicle',
      period: '2026.08 — 2026.09', featured: true,
      summary: 'OV7670 영상의 적색 객체를 1-bit Binary·Gaussian·ROI·Decoder로 판별하고, AXI4-Lite UART IP를 통해 0xFF STOP 명령을 전달했습니다.',
      role: 'Red Detect ISP · ROI / Red Decoder · Gaussian Blur',
      tags: ['SystemVerilog', 'FPGA', 'ISP', 'AXI4-Lite', 'OV7670'],
      highlights: ['Red Detection 1-bit Binary 데이터 처리', 'ROI·Red Decoder 영상 경로 구성', '카메라–ISP–SoC 데이터 경로 연동'],
      context: 'FPGA에서 카메라 입력을 처리하고 결과를 SoC 주변장치와 연결하는 ADAS ISP 프로젝트입니다. 담당 기능은 Red Detect ISP와 ROI, Red Decoder 및 Gaussian Blur 구현입니다.',
      steps: [{heading:'RGB565 → 1-bit Red Filter',text:'R≥18, G≤24, B≤12 조건으로 적색 Pixel을 Binary로 추출하고 Frame Buffer에 저장했습니다.'},{heading:'Gaussian · ROI · Red Decoder',text:'3×3 Noise Filtering 후 Bounding Box 최소·최대 좌표를 계산하고 크기 10px 이상·중심 위치 조건으로 객체를 판별했습니다.'},{heading:'WAIT_UNRED + UART STOP',text:'검출 시 0xFF STOP을 전송하고 WAIT_UNRED State로 정지 반복·재출발 문제를 개선했습니다. Control 보드의 MicroBlaze로 UART 결과를 전달했습니다.'}],
      verification: ['Red 객체 ROI 중심 조건 및 0xFF STOP 출력 확인', 'Red Detect → UART → MicroBlaze → Step Motor 정지 경로 팀 단위 통합 검증', 'OV7670 입력 Noise가 Sobel Edge에 미치는 영향 점검 및 보완'],
      takeaway:'Pixel 유효 구간과 모듈 간 지연을 함께 관리해야 영상 처리 결과의 정렬을 유지할 수 있음을 확인했습니다.',
      architecture:['OV7670', 'Pixel Capture', 'ISP / ROI', 'AXI4-Lite', 'Output']
    },
    {
      slug: 'spi-i2c-uvm', title: 'SPI · I2C RTL 설계 및 UVM 검증', category:'RTL · UVM 검증', filter:'verification',
      period:'2026.06.11 — 2026.06.18', featured:true,
      summary:'SPI·I2C Master/Slave RTL을 설계하고 Transaction 기반 UVM 환경으로 프로토콜 동작을 검증했습니다.',
      role:'SPI / I2C RTL · UVM Testbench · Scoreboard / Coverage',
      tags:['SystemVerilog','UVM 1.2','SPI','I2C','VCS'],
      highlights:['SPI Master/Slave Transaction 검증', 'I2C Slave READ / WRITE 확인', '정의한 Functional Coverage 100% 달성'],
      context:'Serial Protocol Master/Slave의 기능을 구현하고 UVM 기반 재사용 가능한 테스트벤치로 정상 동작을 확인했습니다.',
      steps:[{heading:'SPI/I2C Master·Slave RTL',text:'SPI Mode 0은 상승 Edge Sample / 하강 Edge Update로 구분하고, I2C는 START·주소·ACK·READ/WRITE·STOP FSM을 구성했습니다.'},{heading:'UVM Scoreboard 자동 비교',text:'Sequence–Driver–Monitor–Scoreboard 경로를 구성하고 SPI MOSI/MISO 양방향, I2C Read/Write 수신 데이터를 기대값과 비교했습니다.'},{heading:'Coverage + 실보드 검증',text:'SPI Fast/Normal/Slow 866건, I2C WRITE/READ 1,564건 FAIL 0을 확인하고 Basys 3 Logic Analyzer 파형과 Functional Coverage를 대조했습니다.'}],
      verification:['SPI Master→Slave·Slave→Master 각각 866건 PASS / FAIL 0', 'I2C WRITE 782건 + READ 782건 = 총 1,564건 PASS / FAIL 0', '정의한 SPI·I2C Functional Coverage 100%; Logic Analyzer READ/WRITE 파형 첨부'],
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
      steps:[{heading:'PCLK/HREF/VSYNC Pixel Capture',text:'OV7670의 8-bit 데이터 2Byte를 조합해 Pixel을 생성하고 PCLK Write Domain에서 유효 Frame 데이터를 저장했습니다.'},{heading:'Dual-Port BRAM 주소 변환',text:'320×240 Buffer를 VGA 640×480에 출력하기 위해 Read Address를 ((y>>1)×320)+(x>>1)로 산출했습니다.'},{heading:'VGA 1-Clock Latency 정렬',text:'BRAM Read Data가 1Clock 뒤에 출력되므로 DE·HSYNC·VSYNC를 같은 주기만큼 지연해 화면 데이터와 맞췄습니다.'}],
      verification:['BRAM test.mem 패턴으로 VGA 출력 경로 독립 검증', 'ILA Sampling Clock을 PCLK으로 변경해 Capture Write Enable 관찰', 'AXI4-Lite SCCB 제어와 Camera 초기화/영상 출력 경로 점검'],
      takeaway:'영상 파이프라인에서는 데이터 자체뿐 아니라 valid와 주소의 시점까지 정렬해야 합니다.',architecture:['OV7670','Pixel Capture','BRAM','VGA Timing','Display']
    },
    {
      slug:'axi-soc',title:'AXI4-Lite SoC Peripheral 통합',category:'RTL · SoC',filter:'soc',filters:['soc','rtl'],period:'2026.06.21 — 2026.06.30',
      summary:'MicroBlaze SoC에 Custom AXI4-Lite SPI IP와 GPIO·Timer·UART를 통합하고, SPI RAM Read 시 주소가 변하는 버그를 RTL에서 해결했습니다.',
      role:'AXI4-Lite IP · Register Map · Bare-metal C',tags:['AXI4-Lite','MicroBlaze','C','Vivado','Vitis'],
      highlights:['AXI4-Lite Register Map 구성', 'Custom Peripheral IP 통합', 'MicroBlaze App–Driver–HAL 연동'],
      context:'Processor가 주변장치를 Register로 제어할 수 있도록 AXI4-Lite 인터페이스와 Bare-metal Firmware를 연결한 SoC 프로젝트입니다.',
      steps:[{heading:'AXI4-Lite / Register Map',text:'MicroBlaze에 GPIO·Timer·UART·SPI IP를 연결하고 SPI SR(0x00), TDR(0x04), RDR(0x08), CR(0x0C)을 정의했습니다.'},{heading:'SPI Master RTL / Vitis',text:'C Application이 Command–Address–Data를 구성하고 SPI Master는 Mode 0에서 SCLK/MOSI/MISO/SS_n 전송 Timing을 처리하도록 분리했습니다.'},{heading:'Slave RAM Read 주소 래치 오류',text:'ram[read_data]가 Dummy Byte에 따라 0번지를 가리키던 원인을 찾아 ram[addr]로 수정하고 Logic Analyzer로 0x00~0x03 Read/Write 일치를 확인했습니다.'}],
      verification:['Basys 3 두 대의 SPI Master/Slave 통신 및 RAM 0x00~0x03 Read/Write 데이터 일치', 'Logic Analyzer의 SCLK/MOSI/MISO/SS_n 파형과 Vitis Terminal 출력 확인', 'GPIO UVM: 정의한 Address/Direction/WSTRB/Cross Coverage 100%'],
      takeaway:'SoC 동작은 RTL 인터페이스와 SW Register 규약이 일치해야 완성된다는 점을 확인했습니다.',architecture:['MicroBlaze','AXI4-Lite','Register Map','Peripheral','Firmware']
    },
    {
      slug:'jetson-ai',title:'Jetson Orin Nano 온디바이스 AI 파이프라인',category:'온디바이스 AI',filter:'ai',period:'2026.08.05 — 2026.08.19',
      summary:'Jetson Orin Nano에서 YOLO11과 MiVOLO를 구동하고 검출·추적 결과를 Web UI로 확인하는 파이프라인을 구성했습니다.',
      role:'Inference Pipeline · Tracking · Web UI',tags:['Jetson Orin Nano','YOLO11','MiVOLO','Web UI'],
      highlights:['YOLO11 / MiVOLO 추론 구성', 'Jetson On-Device 실행 환경', '결과 확인용 Web UI 연동'],
      context:'Edge Device에서 영상 추론 결과를 시각화하는 온디바이스 AI 프로젝트입니다.',
      steps:[{"heading":"Jetson Orin Nano 실행 환경","text":"Jetson Orin Nano에서 YOLO11·MiVOLO 추론을 실행하도록 영상 입력과 모델 실행 환경을 구성했습니다."},{"heading":"Detection · Tracking 흐름","text":"객체 검출 결과를 Tracking 정보 및 후속 분석 결과와 연결하는 처리 경로를 구성했습니다."},{"heading":"Web UI 결과 확인","text":"영상과 인식·추적 결과를 Web UI에 표시했습니다. 측정하지 않은 FPS·정확도는 수치화하지 않았습니다."}],
      verification:['Jetson 환경에서 추론 파이프라인 실행', 'Web UI 결과 표시 확인'],
      takeaway:'모델 출력이 사용 가능한 시스템 정보가 되려면 전처리와 후처리, UI 경로를 함께 고려해야 합니다.',architecture:['Camera / Video','YOLO11','Tracking','MiVOLO','Web UI']
    },
    {
      slug:'stm32-keymatrix-pir',title:'CMSIS KeyMatrix · PIR 센서 제어',category:'MCU · Firmware',filter:'firmware',period:'2026.07.23 — 2026.07.27',
      summary:'STM32에서 CMSIS Register 접근과 HAL을 비교하며 Key Matrix와 PIR 센서를 Bare-metal로 제어했습니다.',
      role:'STM32 Register / HAL · Key Matrix · PIR',tags:['STM32','CMSIS','HAL','Bare-metal'],
      highlights:['CMSIS Register / HAL 구현', 'Key Matrix 스캔 처리', 'PIR 센서 입력 확인'],
      context:'MCU 주변장치를 Register 단위와 HAL 두 방식으로 다뤄보며 제어 계층의 차이를 익힌 프로젝트입니다.',
      steps:[{"heading":"CMSIS Register · HAL 비교","text":"GPIO Direction/Pull/Input 설정을 Register 접근과 HAL API로 비교하며 STM32 주변장치 초기화 경로를 구성했습니다."},{"heading":"Key Matrix Row/Column Scan","text":"행·열 GPIO의 출력과 입력을 순차 확인해 눌린 Key를 판정했습니다."},{"heading":"PIR Sensor Event","text":"PIR Sensor 입력의 변화를 감지 Event로 전달하고 Key Scan과 별도로 처리했습니다."}],
      verification:['키 입력 스캔 동작', 'PIR 센서 이벤트 처리'],
      takeaway:'상위 API뿐 아니라 내부 Register 설정을 이해해야 주변장치 동작을 추적하기 쉽습니다.',architecture:['GPIO Input','CMSIS / HAL','Key Scan','PIR Input','Application']
    },
    {
      slug:'rv32i-cpu',title:'RV32I 37명령 Single-Cycle CPU',category:'RTL · CPU',filter:'rtl',period:'2026.05.19 — 2026.05.27',
      summary:'RV32I 명령어 37개를 지원하는 단일 사이클 CPU를 Datapath와 Control Unit 중심으로 설계했습니다.',
      role:'Single-Cycle CPU · Datapath · Control Unit',tags:['SystemVerilog','RISC-V','Basys3','CPU'],
      highlights:['RV32I 37개 명령 디코딩', 'Datapath / Control Unit 설계', 'Basys3 타깃 RTL 구현'],
      context:'RV32I Instruction 처리 경로를 설계하며 CPU 내부의 Control과 Datapath 상호작용을 확인했습니다.',
      steps:[{"heading":"RV32I 37명령 Decoder","text":"Opcode와 Instruction Format을 기준으로 ALU Control, Register Write, Branch/Jump 선택 신호를 생성했습니다."},{"heading":"Single-Cycle Datapath","text":"PC → Instruction → Register File → ALU → Memory/Writeback 경로를 구성하고 PC Update MUX를 연결했습니다."},{"heading":"R-Type · Store · JALR 검증","text":"Instruction별 시뮬레이션 파형에서 ALU, Memory Write, PC 업데이트가 의도대로 동작하는지 확인했습니다."}],
      verification:['RV32I 37개 명령어 지원 범위 점검', 'Single-Cycle 데이터 흐름 분석'],
      takeaway:'명령어 한 개의 처리도 여러 하위 블록의 정확한 조합으로 완성된다는 점을 배웠습니다.',architecture:['Instruction','Decoder','Register File','ALU','Writeback']
    },
    {
      slug:'uart-fifo-uvm',title:'SystemVerilog UART · FIFO 클래스 검증',category:'SystemVerilog · 검증',filter:'verification',period:'2026.05.12 — 2026.05.18',
      summary:'UART·FIFO DUT를 Class 기반 검증 환경으로 구성해 재사용 가능한 테스트벤치를 만들었습니다.',
      role:'Generator · Driver · Monitor · Scoreboard',tags:['SystemVerilog','OOP','UART','FIFO'],
      highlights:['Generator / Driver / Monitor / Scoreboard 구성', 'UART·FIFO 시나리오 검증', 'Class 기반 검증 환경 분리'],
      context:'UART/FIFO 기능을 모듈별 관측과 비교로 검증하는 Testbench 설계 프로젝트입니다.',
      steps:[{"heading":"Class 기반 Transaction/Generator","text":"SystemVerilog Class로 전송 데이터와 제어 조건을 정의하고 Generator가 검증 자극을 생성하도록 구성했습니다."},{"heading":"Driver → DUT → Monitor","text":"Driver가 입력을 구동하고 Monitor가 UART RX/TX 및 FIFO 실제 동작을 관찰하도록 역할을 분리했습니다."},{"heading":"Scoreboard와 파형 검증","text":"예상 데이터와 관측 결과를 비교하고 UART/FIFO/Loopback 파형으로 검증 지점을 확인했습니다."}],
      verification:['UART/FIFO 기능 시나리오 검증', 'Class 기반 Testbench 모듈 간 동작 확인'],
      takeaway:'검증 코드도 역할을 분리하면 수정과 재사용이 쉬워집니다.',architecture:['Generator','Driver','UART / FIFO','Monitor','Scoreboard']
    },
    {
      slug:'uart-fifo-sensor',title:'UART · FIFO 기반 PC–FPGA 센서 연동',category:'FPGA · 센서',filter:'fpga',period:'2026.05.01 — 2026.05.06',
      summary:'DHT11·HC-SR04 센서 값을 FPGA에서 받아 UART·FIFO로 PC에 전송하는 데이터 경로를 구성했습니다.',
      role:'Sensor Interface · UART / FIFO · PC Link',tags:['SystemVerilog','UART','FIFO','Basys3'],
      highlights:['DHT11 / HC-SR04 센서 인터페이스', 'UART·FIFO 데이터 경로', 'PC–FPGA 통신 확인'],
      context:'센서 입력부터 FIFO 저장과 UART 송신까지 연속된 FPGA 데이터 경로를 다룬 프로젝트입니다.',
      steps:[{"heading":"DHT11 · HC-SR04 Sensor Interface","text":"온습도와 거리 센서의 서로 다른 입력 Timing을 FPGA에서 처리하도록 인터페이스를 구성했습니다."},{"heading":"FIFO Buffer","text":"측정값을 FIFO에 저장해 센서 데이터 생성 주기와 UART 전송 속도 차이를 완충했습니다."},{"heading":"UART → PC Terminal","text":"FIFO에서 읽은 센서 값을 UART로 전송하고 PC Terminal에서 수신 결과를 확인했습니다."}],
      verification:['센서 데이터 전송 경로 확인', 'PC Terminal 수신 확인'],
      takeaway:'서로 다른 속도의 블록은 버퍼를 통해 데이터 흐름을 안정적으로 연결할 수 있습니다.',architecture:['DHT11 / HC-SR04','Sensor Interface','FIFO','UART TX','PC']
    },
    {
      slug:'uart-loopback',title:'UART 9600bps Hardware Loopback',category:'RTL · UART',filter:'rtl',period:'2026.04.23 — 2026.04.27',
      summary:'9600 bps UART RX/TX를 16배 Oversampling으로 구현하고 PC–FPGA Loopback 동작을 확인했습니다.',
      role:'UART RX / TX RTL · Sampling · Loopback',tags:['SystemVerilog','UART','Basys3','9600 bps'],
      highlights:['RX·TX 16배 Oversampling', '9600 bps / 8N1 Frame 처리', 'PC–FPGA Hardware Loopback'],
      context:'UART의 Start, Data, Stop Bit 처리와 Clock 기준 Sampling을 직접 구현한 기초 RTL 프로젝트입니다.',
      steps:[{"heading":"9600 bps · 8N1 Frame","text":"Start 1bit, Data 8bit, Stop 1bit 형태의 UART TX/RX FSM과 Baud Timing을 구현했습니다."},{"heading":"2-FF Sync / 16× Oversampling","text":"비동기 RX를 동기화한 후 Data Bit 중앙에서 Sampling하여 수신 Byte를 복원했습니다."},{"heading":"PC–FPGA Loopback","text":"수신 Byte를 다시 UART TX로 송신하고 실물 보드 및 시뮬레이션 파형에서 일치 여부를 확인했습니다."}],
      verification:['9600 bps 8N1 UART Frame 확인', 'PC–FPGA Hardware Loopback 검증'],
      takeaway:'샘플링 시점을 정확히 정의하는 것이 Serial 통신 구현의 출발점임을 확인했습니다.',architecture:['PC UART','FPGA RX','FIFO / Data','FPGA TX','PC UART']
    },
    {
      slug:'fpga-stopwatch',title:'FPGA Stopwatch · Watch',category:'RTL · FPGA',filter:'rtl',period:'2026.04.16 — 2026.04.20',
      summary:'Counter와 FSM, 7-Segment를 조합해 스톱워치와 시계 모드가 전환되는 FPGA 회로를 설계했습니다.',
      role:'Counter · FSM · 7-Segment Display',tags:['SystemVerilog','FSM','7-Segment','Basys3'],
      highlights:['Counter / FSM 설계', '7-Segment 표시 제어', 'Stopwatch / Watch 모드 전환'],
      context:'FPGA의 기본 순차회로와 상태 전이를 실제 보드 Display에 연결한 프로젝트입니다.',
      steps:[{"heading":"시간 Tick / Counter","text":"FPGA Clock으로 시간 갱신 Tick을 만들고 자리올림 Counter를 구성했습니다."},{"heading":"Watch · Stopwatch FSM","text":"모드 및 버튼 이벤트에 따른 시간 증가·정지·전환 상태를 구현했습니다."},{"heading":"7-Segment 출력 / 검증","text":"7-Segment Scan에 시간 데이터를 연결하고 Stopwatch, Watch, AM/PM 전환 시뮬레이션을 확인했습니다."}],
      verification:['Stopwatch 동작 확인', '모드 전환과 표시 동작 확인'],
      takeaway:'간단한 UI도 시간 기준과 상태 전이를 분명히 정의해야 예측 가능하게 동작합니다.',architecture:['Clock','Counter','FSM','7-Segment','Display']
    }
  ]
};


// 기술 상세: 원본 노션 설계 기록과 실보드/검증 근거를 기반으로 작성
window.PORTFOLIO.technicalDetails = {
  "can-adas": {
    "focus": "시스템 보드 역할: Zynq Z7-20(ADAS ECU) → CAN Bus → Basys 3 FPGA(CAN RX RTL + MicroBlaze VCU / Vitis C) → STM32(Motor1·2 ECU). CAN 비트 수신부터 VCU Event 판단, Motor Command 전달까지 각 책임을 분리했습니다.",
    "spec": [
      [
        "ECU / 보드 구성",
        "Zynq Z7-20: ADAS · Basys 3: VCU · STM32: Motor1/2 ECU",
        "VCU는 STM32가 아닌 Basys 3"
      ],
      [
        "VCU 실행 환경",
        "Basys 3 FPGA / MicroBlaze / Vitis Bare-metal C",
        "CAN HAL·Driver·Application"
      ],
      [
        "CAN Clock / Rate",
        "80 MHz · 500 kbps · 16 TQ/bit",
        "1 bit = 2.000 μs · Sample Point 87.5%"
      ],
      [
        "Bit Timing 구성",
        "BRP=9 · TSEG1=13 · TSEG2=2 · SJW=2",
        "125 ns × 16 TQ"
      ],
      [
        "Protocol / CRC",
        "CAN 2.0A / 11-bit Base Frame / CRC-15 (0x4599)",
        "Destuffing · ACK · Stuff/Form/CRC Error"
      ],
      [
        "Task 주기",
        "10 ms Control Task / 100 ms Heartbeat 확인",
        "ISR–Queue–Superloop 분리"
      ],
      [
        "주요 CAN ID",
        "0x100 VCU HB · 0x110/0x111 Motor CMD · 0x301 ADAS1 Result",
        "제어/진단 메시지 분리"
      ]
    ],
    "implementation": [
      {
        "title": "01 | CAN RX RTL · Bit Timing/Frame 복원",
        "items": [
          "2-FF Synchronizer → 공통 TQ Tick → Hard Sync/Resync → Destuffer → Frame FSM → CRC-15 → RX Mailbox 순으로 기능별 모듈을 구성했습니다.",
          "CAN 2.0A 11-bit Standard Frame을 SOF / ID / RTR·IDE·R0 / DLC / DATA / CRC / ACK / EOF·IFS State에서 복원했습니다.",
          "동일 TQ 기준으로 RX/TX Sample Point를 정렬하고, Stuff / Form / CRC Error 경로와 ACK Slot 처리를 검토했습니다."
        ]
      },
      {
        "title": "02 | AXI4-Lite CAN Register Interface",
        "items": [
          "CAN_BTR(0x00)에 BRP/TSEG1/TSEG2/SJW를, CAN_CR(0x04)에 TX Start/Software Reset을, CAN_SR(0x08)에 Status와 RX Interrupt Clear를 배치했습니다.",
          "TX Mailbox/Data(0x0C~0x14), RX Mailbox/Data(0x18~0x20)를 통해 Hardware Frame 정보를 Software가 읽고 쓰도록 설계했습니다.",
          "수신 완료 시 Mailbox에 데이터를 저장하고 RX Interrupt를 발생시키며, Status Register의 W1C 경로로 Interrupt를 해제하도록 구성했습니다."
        ]
      },
      {
        "title": "03 | Basys 3 VCU · MicroBlaze Firmware",
        "items": [
          "VCU는 STM32가 아니라 Basys 3 FPGA의 MicroBlaze에서 구동합니다. Vitis Bare-metal C로 HAL → Driver → Application 계층을 구성했습니다.",
          "HAL은 CAN Controller Register 접근, Driver는 CAN RX Interrupt·RX/TX Queue, Application은 ADAS Event 처리·차선 PD 제어·Motor Command 생성·차량 상태 관리를 담당합니다.",
          "CAN 수신 ISR에서는 RX Queue 등록까지만 수행하고, Superloop의 10 ms Task에서 CAN_ProcessRx → Parser → APP Event → Motor Command Queue → CAN_ProcessTx 흐름을 처리했습니다."
        ]
      },
      {
        "title": "04 | STM32 Motor ECU 연동과 Safe Stop",
        "items": [
          "Motor1·Motor2 ECU는 STM32를 사용합니다. Basys 3 VCU가 0x110/0x111 Command를 보내고 각 Motor ECU가 이를 수신해 좌·우 모터 제어에 사용하도록 연계했습니다.",
          "ADAS Result는 Green/Red/Sign 30/70/Speed Bump/Lane Event로 해석하고, 차선 중심 X좌표를 이용해 좌·우 Target RPM을 계산하도록 구성했습니다.",
          "Fault/Heartbeat Timeout 조건에서는 Safe Stop을 Latch하고 일반 제어보다 E-STOP·Motor STOP을 우선하도록 구성했습니다. ADAS 미연결 검증에서는 Simulation Frame을 사용했습니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "공용 Timing 부재와 자기 송신 Dominant Edge의 Resync",
        "cause": "모듈별 Tick 기준 및 자기 송신 중 RX Falling Edge의 인식 조건으로 인해 불필요한 Positive Resync가 발생하여 CAN Bit Time이 흔들렸습니다.",
        "action": "RX/TX 공통 TQ Tick 사용을 제안·반영하고, RX Idle/실제 TX Level을 참고하여 자기 송신 Edge가 Resync 조건을 충족하지 않도록 개선했습니다.",
        "result": "비정상 2.125 μs 사례를 CAN 500 kbps 기준 2.000 μs/bit로 복원했습니다. 공개 원본 파형은 Hard Sync·Resync이며, 해당 수치 전후 비교 파형은 별도로 제시하지 않습니다."
      },
      {
        "issue": "CRC Sequence–Delimiter 경계의 Form Error 전이",
        "cause": "CRC 수신과 Delimiter 상태의 입력 유효 시점이 맞지 않아 정상 Frame이 RX_ERROR_FLAG로 이동한 이력이 있습니다.",
        "action": "CRC 15비트 수신, CRC Check, Delimiter의 Recessive 판정 및 FSM 전이를 분리해 검사했습니다.",
        "result": "현재 기록된 RTL에서는 RX_CRC_DELIMITER에서도 destuff_en=1인 구현 상태를 명시합니다. 해당 State의 최신 구현과 규격상의 일반 설명을 혼동하지 않습니다."
      },
      {
        "issue": "CAN 수신 ISR과 차량 제어 Task의 책임 분리",
        "cause": "CAN Frame 파싱·ADAS Event·Motor 명령을 Interrupt 내부에서 모두 처리하면 실시간 제어 Task와의 실행 순서를 관리하기 어렵습니다.",
        "action": "수신 Interrupt는 RX Queue에 Frame을 적재하고, 10 ms Superloop Task에서 Parser–Event–Motor Command–Tx Queue 처리를 수행하도록 설계했습니다.",
        "result": "수신 처리와 제어 명령 생성을 분리하고 주기 작업의 실행 순서를 명확히 했습니다."
      }
    ],
    "checks": [
      [
        "CAN RX RTL Simulation",
        "80 MHz · 500 kbps · 16 TQ의 Hard Sync/Resync 및 Frame/CRC 처리 검토",
        "본인 구현 · RTL 파형"
      ],
      [
        "VCU FW 경로",
        "Basys 3 MicroBlaze에서 CAN RX ISR → RX Queue → 10 ms Superloop → Motor TX Queue",
        "본인 구현 · 교육 프로젝트"
      ],
      [
        "VCU–Motor 실기기 경로",
        "ADAS Result는 Simulation Frame 주입 → Basys 3 VCU → 실제 STM32 Motor1·2 ECU",
        "단계별 통합 검증"
      ],
      [
        "검증 범위 제한",
        "CNN 기반 실제 ADAS ECU의 End-to-End 연동과 29-bit Extended ID 수신 기능을 본 검증 완료 항목으로 표기하지 않음",
        "과장 방지"
      ]
    ],
    "scope": "교육 팀 프로젝트. 본인의 주요 구현 내용은 CAN RX RTL의 Sync/Timing/Destuff/Frame/CRC, 공통 Timing 개선 제안 및 Basys 3 MicroBlaze 기반 VCU CAN HAL·Driver·Application입니다. STM32 Motor ECU와 Zynq ADAS 인식부는 시스템의 다른 보드 역할입니다. ADAS 결과 Simulation Frame을 사용한 실기기 제어 경로 검증과 전체 CNN–CAN–Motor 실시간 통합을 구분합니다.",
    "source": "https://app.notion.com/p/3e6e09982689810d8a2df537627333a2"
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
