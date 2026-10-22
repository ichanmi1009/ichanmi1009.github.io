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
      slug:'jetson-ai',title:"Jetson Orin Nano 차량 안전 AI · 2열 잔류 감지",category:'온디바이스 AI',filter:'ai',period:'2026.08.05 — 2026.08.19',
      summary:"YOLO11n/s/m을 Edge 성능·Young Recall로 비교하고 YOLO11n Fine-tuning으로 아동 Recall 75.31%→93.83%를 개선했습니다.",
      role:"2열 잔류 감지 · YOLO11 성능 평가/Fine-tuning · Web UI · 팀장",tags:['Jetson Orin Nano','YOLO11','MiVOLO','Web UI'],
      highlights:["Young Recall 75.31% → 93.83% (+18.52%p)","Animal Recall 86.67% → 96.67% (+10.00%p)","Jetson Orin Nano 모델 선정 · Web UI 경고 파이프라인"],
      context:"운전자·2열·보안 카메라의 세 서브시스템을 가진 팀 프로젝트입니다. 주요 구현 내용은 2열 아동·반려동물 감지와 모델 선정·Fine-tuning·Edge 성능 비교입니다.",
      steps:[{"heading":"YOLO11n/s/m 비교","text":"Young·Animal Recall, Latency, Parameters, FLOPs를 비교해 아동 미검출 위험이 낮은 YOLO11n을 Base Model로 선정했습니다."},{"heading":"YOLO11n Fine-tuning","text":"Train 268장·Validation 35장, 앞 10 Layer Freeze, AdamW 0.0005, 10 Epoch로 Person/Cat/Dog 학습을 진행했습니다."},{"heading":"Edge Pipeline / 경고","text":"Jetson에서 Detection→Tracking→MiVOLO Age→잔류 시간 Stage→Web UI로 연결하고 Demo에서는 10/15/20초로 경고를 검증했습니다."}],
      verification:["Unified Evaluation 211: Young Recall 75.31%→93.83%, Animal Recall 86.67%→96.67%","Person Detection Rate 78.81%→99.34%, Young Miss 17건→0건","시연 경고 Stage 10/15/20초·Jetson TensorRT·MiVOLO TorchScript 동작 확인"],
      takeaway:'모델 출력이 사용 가능한 시스템 정보가 되려면 전처리와 후처리, UI 경로를 함께 고려해야 합니다.',architecture:["Webcam · 2열","YOLO11n Detection","Tracking","MiVOLO V2 · Age","Risk Stage · Web UI"]
    },
    {
      slug:'stm32-keymatrix-pir',title:"STM32 CMSIS Bare-metal 스마트 도어락",category:'MCU · Firmware',filter:'firmware',period:'2026.07.23 — 2026.07.27',
      summary:"STM32F411RE에서 HAL 없이 CMSIS Register로 GPIO·EXTI·Timer·I2C를 제어해 PIR–4×4 Keypad–Servo–LCD 도어락을 구현했습니다.",
      role:"STM32F411RE CMSIS Register · Keypad FSM · PIR EXTI · Servo/I2C LCD",tags:['STM32F411RE','CMSIS','Bare-metal C','GPIO/EXTI','I2C/PWM'],
      highlights:["HAL 없이 GPIO·EXTI·TIM·I2C Register 직접 제어","Key Matrix 중복 입력을 비블로킹 FSM으로 해결","PIR→4자리 인증→Servo·LCD·Buzzer PASS"],
      context:"교육에서 수행한 STM32F411RE Nucleo-64 Bare-metal C 프로젝트입니다. HAL을 사용하지 않고 CMSIS Register 직접 접근으로 PIR EXTI2, Keypad 4×4, TIM5 Servo PWM, TIM3 Buzzer PWM, I2C LCD를 통합했습니다.",
      steps:[{"heading":"CMSIS Peripheral 직접 초기화","text":"RCC·GPIO·SYSCFG/EXTI/NVIC·TIM PWM·I2C의 Register 접근과 초기화 순서를 구성했습니다."},{"heading":"4×4 Keypad 비블로킹 FSM","text":"IDLE→SET_ROW→READ_ROW→KEY_RELEASE로 Row 출력과 Column Sampling을 분리해 Key가 중복 인식되던 문제를 해결했습니다."},{"heading":"PIR·인증·출력 통합","text":"PD2 EXTI2에서 접근을 감지해야 Keypad가 활성화되고 비밀번호 일치 시 TIM5 Servo·I2C LCD·TIM3 Buzzer에 결과를 출력합니다."}],
      verification:["PIR 미감지 시 Keypad 비활성 및 감지 후 인증 시퀀스 PASS","정상·오류 비밀번호, 입력 취소, 비밀번호 변경 PASS","중복 Key와 상태값 덮어쓰기 버그 수정 후 실보드 동작 확인"],
      takeaway:'상위 API뿐 아니라 내부 Register 설정을 이해해야 주변장치 동작을 추적하기 쉽습니다.',architecture:["PIR EXTI2","Keypad 4×4 FSM","Password Check","TIM5 Servo / TIM3 Buzzer","I2C LCD"]
    },
    {
      slug:'rv32i-cpu',title:'RV32I 37명령 Single-Cycle CPU',category:'RTL · CPU',filter:'rtl',period:'2026.05.19 — 2026.05.27',
      summary:"RV32I 37개 명령의 Single-Cycle Datapath를 구현하고 C→RISC-V Assembly→CPU 실행으로 1~10 누적합 55를 검증했습니다.",
      role:'Single-Cycle CPU · Datapath · Control Unit',tags:['SystemVerilog','RISC-V','Basys3','CPU'],
      highlights:["R/I/Load/S/B/U/J/JALR 37명령 구현","C·Assembly 통합 실행: sum=55","R-Type·Store·JALR 파형 검증"],
      context:"SystemVerilog로 PC·Instruction Memory·Register File·ALU·Data Memory·Control Unit을 연결한 RV32I CPU입니다. 명령어 계열별 RTL Simulation과 GCC로 변환한 C 누적합 프로그램 실행을 검증했습니다.",
      steps:[{"heading":"RV32I 37명령 Decoder","text":"Opcode와 Instruction Format을 기준으로 ALU Control, Register Write, Branch/Jump 선택 신호를 생성했습니다."},{"heading":"Single-Cycle Datapath","text":"PC → Instruction → Register File → ALU → Memory/Writeback 경로를 구성하고 PC Update MUX를 연결했습니다."},{"heading":"R-Type · Store · JALR 검증","text":"Instruction별 시뮬레이션 파형에서 ALU, Memory Write, PC 업데이트가 의도대로 동작하는지 확인했습니다."}],
      verification:["R/I/Load/S/B/U/J/JALR 계열 총 37개 명령어","C 1~10 누적합 sum=55 → data_ram[58] / 주소232","완료 값 0x12345678 → data_ram[59], JAL/JALR 호출·복귀 확인"],
      takeaway:'명령어 한 개의 처리도 여러 하위 블록의 정확한 조합으로 완성된다는 점을 배웠습니다.',architecture:['Instruction','Decoder','Register File','ALU','Writeback']
    },
    {
      slug:'uart-fifo-uvm',title:'SystemVerilog UART · FIFO 클래스 검증',category:'SystemVerilog · 검증',filter:'verification',period:'2026.05.12 — 2026.05.18',
      summary:"UART RX/TX·FIFO·Loopback을 SystemVerilog Class 기반 Generator·Driver·Monitor·Scoreboard로 자동 검증했습니다.",
      role:'Generator · Driver · Monitor · Scoreboard',tags:['SystemVerilog','OOP','UART','FIFO'],
      highlights:["UART RX 500 / TX 500 / Loopback 500 PASS","FIFO Random 500 중 실제 Pop 344건 비교 PASS","Mailbox·Event·tx_busy 동기화 검증"],
      context:"UART/FIFO의 단위·통합 Testbench를 SystemVerilog Class·Mailbox·Event로 구축했습니다. UVM Framework는 사용하지 않은 Class-based Verification이며 자동 Data 비교와 Transaction 순서 검증을 수행했습니다.",
      steps:[{"heading":"Class 기반 Transaction/Generator","text":"SystemVerilog Class로 전송 데이터와 제어 조건을 정의하고 Generator가 검증 자극을 생성하도록 구성했습니다."},{"heading":"Driver → DUT → Monitor","text":"Driver가 입력을 구동하고 Monitor가 UART RX/TX 및 FIFO 실제 동작을 관찰하도록 역할을 분리했습니다."},{"heading":"Scoreboard와 파형 검증","text":"예상 데이터와 관측 결과를 비교하고 UART/FIFO/Loopback 파형으로 검증 지점을 확인했습니다."}],
      verification:["UART RX 500·TX 500·UART/FIFO Loopback 500 PASS / FAIL 0","FIFO Random 500 시도 중 Pop 344회 실제 데이터 비교 PASS","UART RX→FIFO RX 16Byte Full/Pop 및 Boundary 00/55/AA/FF 확인"],
      takeaway:'검증 코드도 역할을 분리하면 수정과 재사용이 쉬워집니다.',architecture:['Generator','Driver','UART / FIFO','Monitor','Scoreboard']
    },
    {
      slug:'uart-fifo-sensor',title:'UART · FIFO 기반 PC–FPGA 센서 연동',category:'FPGA · 센서',filter:'fpga',period:'2026.05.01 — 2026.05.06',
      summary:"DHT11 40-bit Single-wire Controller와 FND Mode MUX를 구현해 온습도·거리·시계 데이터를 UART/FIFO 시스템에 통합했습니다.",
      role:"DHT11 Controller · Checksum/Valid · FND Controller · 팀 통합",tags:['SystemVerilog','UART','FIFO','Basys3'],
      highlights:["DHT11 40-bit FSM · Checksum/Valid","1kHz FND Scan · 4자리 Mode MUX","수신 중 FND 깜빡임을 출력 Register 분리로 해결"],
      context:"3인 팀의 Basys 3 통합 프로젝트입니다. 주요 구현 내용은 DHT11의 40-bit Single-wire FSM 및 FND Controller이고, PC ASCII/HC-SR04/UART/FIFO는 전체 시스템의 다른 경로입니다.",
      steps:[{"heading":"DHT11 40-bit 수신","text":"START Low 약 19ms 이후 Sensor의 High 유지시간을 계수해 0/1을 판별하고 40bit Shift Register를 구성했습니다."},{"heading":"Checksum·valid","text":"4Byte Checksum 비교와 STOP 완료를 동시에 만족할 때만 valid를 발생시켜 온습도 출력 Register를 갱신했습니다."},{"heading":"FND · UART/FIFO 시스템 통합","text":"온습도·거리·Stopwatch/Watch Data를 Mode에 따라 MUX하고 1kHz 4자리 FND Scan에 연결했습니다."}],
      verification:["DHT11 수신 0x21001B003C → 습도33/온도27/Checksum60, valid=1","Checksum 오류 시 valid=0, 출력 Register 유지","PC ASCII 명령으로 모드 전환, 센서 값 FND·PC Terminal 연동 확인"],
      takeaway:'서로 다른 속도의 블록은 버퍼를 통해 데이터 흐름을 안정적으로 연결할 수 있습니다.',architecture:['DHT11 / HC-SR04','Sensor Interface','FIFO','UART TX','PC']
    },
    {
      slug:'uart-loopback',title:'UART 9600bps Hardware Loopback',category:'RTL · UART',filter:'rtl',period:'2026.04.23 — 2026.04.27',
      summary:'9600 bps UART RX/TX를 16배 Oversampling으로 구현하고 PC–FPGA Loopback 동작을 확인했습니다.',
      role:'UART RX / TX RTL · Sampling · Loopback',tags:['SystemVerilog','UART','Basys3','9600 bps'],
      highlights:['RX·TX 16배 Oversampling', '9600 bps / 8N1 Frame 처리', 'PC–FPGA Hardware Loopback'],
      context:'UART의 Start, Data, Stop Bit 처리와 Clock 기준 Sampling을 직접 구현한 기초 RTL 프로젝트입니다.',
      steps:[{"heading":"9600 bps · 8N1 Frame","text":"Start 1bit, Data 8bit, Stop 1bit 형태의 UART TX/RX FSM과 Baud Timing을 구현했습니다."},{"heading":"2-FF Sync / 16× Oversampling","text":"비동기 RX를 동기화한 후 Data Bit 중앙에서 Sampling하여 수신 Byte를 복원했습니다."},{"heading":"PC–FPGA Loopback","text":"수신 Byte를 다시 UART TX로 송신하고 실물 보드 및 시뮬레이션 파형에서 일치 여부를 확인했습니다."}],
      verification:["100 MHz 기반 9600bps · 16× Oversampling (약 651 Clock/Tick)","UART 8N1 LSB First, Start 중앙 확인, rx_done Pulse","ComportMaster 실보드에서 PC→FPGA→PC Loopback 전송·수신 일치"],
      takeaway:'샘플링 시점을 정확히 정의하는 것이 Serial 통신 구현의 출발점임을 확인했습니다.',architecture:['PC UART','FPGA RX','FIFO / Data','FPGA TX','PC UART']
    },
    {
      slug:'fpga-stopwatch',title:'FPGA Stopwatch · Watch',category:'RTL · FPGA',filter:'rtl',period:'2026.04.16 — 2026.04.20',
      summary:"Watch Control/Datapath와 Top Module을 구현해 4bit Shift 자릿수 선택, Safety Gate, Stopwatch/Watch 출력 MUX를 통합했습니다.",
      role:"Watch Control · Watch Datapath · Top Integration · 팀 실보드 검증",tags:['SystemVerilog','FSM','7-Segment','Basys3'],
      highlights:["4-bit Shift 자릿수 선택 0001→0010→0100→1000","Mode Safety Gate · Clock 동기 출력 Register","Watch/Stopwatch FND 공유 · AM/PM LED"],
      context:"2인 팀의 Basys 3 디지털 시계 프로젝트입니다. 주요 구현 내용은 Watch Control Unit, Watch Datapath 및 Top Module 통합입니다. Stopwatch Datapath와 공통 입력 처리 등은 팀 시스템 구성으로 구분합니다.",
      steps:[{"heading":"Watch 시간 설정 Datapath","text":"4bit Shift Register로 10ms·초·분·시 중 수정할 자릿수를 순환 선택하고 선택 Counter에 Up/Down을 적용했습니다."},{"heading":"Safety Gate + Registered Output","text":"FSM 방식에서 버튼 입력이 누락되어 Mode Switch로 입력을 제어하는 Safety Gate 및 동기 Register 구조로 수정했습니다."},{"heading":"Top Integration","text":"Stopwatch/Watch msec·sec·min·hour를 MUX로 선택해 공통 FND 및 AM/PM LED에 연결했습니다."}],
      verification:["Watch 자릿수 선택 0001→0010→0100→1000 순환 확인","Mode 비활성 입력 차단, Watch/Stopwatch 전환 확인","Basys 3 FND와 AM/PM LED 실보드 동작 확인"],
      takeaway:'간단한 UI도 시간 기준과 상태 전이를 분명히 정의해야 예측 가능하게 동작합니다.',architecture:["Button Debounce","Watch Control / Datapath","Mode MUX","FND 1kHz Scan","LED · AM/PM"]
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
    "source": "https://app.notion.com/p/8d0e0998268983d589080183fe895ef1",
    "metrics": [
      {
        "value": "0xFF",
        "label": "Red STOP",
        "detail": "WAIT_UNRED 정지 유지"
      },
      {
        "value": "10 px",
        "label": "ROI 최소 크기",
        "detail": "Center X100~200"
      },
      {
        "value": "115200",
        "label": "UART bps",
        "detail": "ISP → Control Board"
      }
    ]
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
    "github": "https://github.com/ichanmi1009/UVM_SPI_I2C_Verification",
    "metrics": [
      {
        "value": "866",
        "label": "SPI PASS",
        "detail": "MOSI/MISO 각 866"
      },
      {
        "value": "1,564",
        "label": "I2C PASS",
        "detail": "WRITE/READ 각 782"
      },
      {
        "value": "100%",
        "label": "Functional Coverage",
        "detail": "정의한 Coverpoint 기준"
      }
    ]
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
    "source": "https://app.notion.com/p/c7ae099826898398ac70014c3debeb27",
    "metrics": [
      {
        "value": "320×240",
        "label": "Camera Frame",
        "detail": "QVGA"
      },
      {
        "value": "640×480",
        "label": "VGA 출력",
        "detail": "2배 Mapping"
      },
      {
        "value": "1 Clock",
        "label": "BRAM Read Latency",
        "detail": "Sync/DE 정렬"
      }
    ]
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
    "github": "https://github.com/ichanmi1009/AXI_Peripheral",
    "metrics": [
      {
        "value": "0x00~03",
        "label": "Slave RAM",
        "detail": "SPI Read/Write 확인"
      },
      {
        "value": "100%",
        "label": "GPIO UVM Coverage",
        "detail": "정의한 항목 기준"
      },
      {
        "value": "4 Reg",
        "label": "SPI AXI4-Lite",
        "detail": "SR/TDR/RDR/CR"
      }
    ]
  },
  "jetson-ai": {
    "focus": "차량 안전 시스템에서 놓치면 안 되는 대상을 우선했습니다. YOLO11n/s/m의 전체 Accuracy만 보지 않고 아동(Young) Recall과 Edge 연산 자원을 비교한 뒤 Fine-tuning과 Jetson 실행 파이프라인까지 연결했습니다.",
    "spec": [
      [
        "Platform / 모델",
        "NVIDIA Jetson Orin Nano / YOLO11n·s·m / MiVOLO V2",
        "2열 잔류 감지"
      ],
      [
        "Base Model 선정",
        "YOLO11n: Young Recall 75.31%, Animal Recall 86.67%",
        "E2E Latency 886.82 ms, 2.6M Parameters"
      ],
      [
        "학습 조건",
        "Train 268 / Validation 35, 앞 10 Layer Freeze",
        "AdamW, LR 0.0005, 10 Epoch"
      ],
      [
        "Unified Evaluation 211",
        "Final Accuracy 79.15% → 95.26%",
        "Young 75.31%→93.83%; Animal 86.67%→96.67%"
      ],
      [
        "검출 개선",
        "mAP50 51.00% → 90.44%; F1 55.20%→85.87%",
        "Fine-tuning 평가 기준"
      ],
      [
        "Edge 동작",
        "YOLO 2 Frame당 1회 / MiVOLO 약 1초 간격",
        "최근 5회 Age의 Median 사용"
      ],
      [
        "경고 기준",
        "정상 5 / 10 / 20분 → Stage 1/2/3",
        "시연 10 / 15 / 20초 축소"
      ]
    ],
    "implementation": [
      {
        "title": "YOLO11n/s/m 성능 분석 및 선정",
        "items": [
          "YOLO11n/s/m의 Final Accuracy, Young/Animal Recall, E2E Latency, Parameters, FLOPs를 동일 평가 조건에서 비교했습니다.",
          "YOLO11s의 전체 Accuracy가 높았지만 아동 미검출 감소와 연산량을 고려해 YOLO11n을 Base Model로 선정했습니다.",
          "단순 정확도 대신 False Negative를 안전 핵심 지표로 설정한 설계 판단을 명시했습니다."
        ]
      },
      {
        "title": "YOLO11n Fine-tuning",
        "items": [
          "Person·Cat·Dog의 다양한 구도를 추가하고 앞단 10 Layer를 Freeze한 뒤 AdamW, LR 0.0005, 10 Epoch를 적용했습니다.",
          "Unified Evaluation 211에서 Young Recall +18.52%p, Animal Recall +10.00%p, Person Detection Rate +20.53%p를 확인했습니다.",
          "Young Person의 Detector 단계 미검출 17건이 Fine-tuning 후 0건이 됐으며, 연령 추정 단계 오류와 구분했습니다."
        ]
      },
      {
        "title": "Detection → Tracking → Age Estimation",
        "items": [
          "Webcam → YOLO11 → Person Tracking ID → MiVOLO V2 Age → CHILD/ADULT/ANIMAL 분류 → Risk Stage로 연결했습니다.",
          "Person은 추정 Age≤7을 CHILD로, Cat/Dog는 ANIMAL로 판단했습니다.",
          "YOLO TensorRT Engine과 MiVOLO TorchScript를 사용하고 Frame Skip·Age Median으로 실행 빈도를 조절했습니다."
        ]
      },
      {
        "title": "잔류 시간 기반 Stage / Web UI",
        "items": [
          "차량 시동 OFF 상태에서 Child/Animal 검출 지속 시간을 누적하고 알림·Web UI에 Stage를 표시하도록 연계했습니다.",
          "운영 기준 5/10/20분과 시연용 10/15/20초를 구분했습니다.",
          "1열 운전자·2열 잔류·외부 보안 카메라 3개 하위 시스템 중 주요 구현 내용은 2열 감지와 모델 성능 비교입니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "전체 Accuracy가 높아도 아동 미검출이 많은 문제",
        "cause": "YOLO11s는 전체 Accuracy가 높았으나 안전 핵심 대상인 Young Recall이 YOLO11n보다 낮았습니다.",
        "action": "Young/Animal Recall·Latency·Power/Complexity 기준으로 YOLO11n을 선택하고 Person/Cat/Dog 데이터를 추가 학습했습니다.",
        "result": "Young Recall 75.31%→93.83%, Animal Recall 86.67%→96.67%로 개선했습니다."
      },
      {
        "issue": "Detector와 Age Estimator 오류 혼동",
        "cause": "Child 미검출 현상이 탐지 누락인지 연령 분류 오류인지 구분되지 않으면 개선 대상이 달라집니다.",
        "action": "Confusion Matrix와 Young Miss 사례에서 YOLO Detection 결과와 MiVOLO Age Estimation을 단계별로 분리해 분석했습니다.",
        "result": "Detector 기준 Young Miss 17건→0건; 일부 잔여 분류 오류는 Age Estimation 경로로 구분했습니다."
      }
    ],
    "checks": [
      [
        "YOLO11n Base Model",
        "Young 75.31% / Animal 86.67% / E2E Latency 886.82ms",
        "동일 평가 조건 비교"
      ],
      [
        "Fine-tuned / Unified Evaluation 211",
        "Young 93.83% / Animal 96.67% / Final Accuracy 95.26%",
        "공통 평가셋 기준"
      ],
      [
        "Person Detection Rate",
        "78.81% → 99.34%",
        "Detector 단계"
      ],
      [
        "Jetson Edge 동작",
        "Detection→Tracking→MiVOLO→Stage→Web UI",
        "시연·통합 경로"
      ]
    ],
    "scope": "3인 팀 프로젝트(팀장). 개인 구현 및 분석 중심은 2열 잔류 객체 검출, YOLO 모델 비교·Fine-tuning, Edge Performance Trade-off, 결과 Web UI 시연입니다. 1열 졸음 및 외부 보안 하위 시스템을 모두 개인 구현으로 표현하지 않았습니다. 지표는 Notion에 기록된 평가 조건에서의 결과입니다.",
    "source": "https://app.notion.com/p/cc5e0998268982c2900e014356023108",
    "metrics": [
      {
        "value": "93.83%",
        "label": "Young Recall",
        "detail": "+18.52%p"
      },
      {
        "value": "96.67%",
        "label": "Animal Recall",
        "detail": "+10.00%p"
      },
      {
        "value": "95.26%",
        "label": "Final Accuracy",
        "detail": "Unified Evaluation 211"
      }
    ]
  },
  "stm32-keymatrix-pir": {
    "focus": "STM32F411RE에서 HAL 없이 CMSIS Peripheral Register로 시스템을 구현했습니다. PIR EXTI가 Key Matrix를 활성화하고, 비밀번호 인증 결과가 Servo·I2C LCD·Buzzer로 이어지도록 설계했습니다.",
    "spec": [
      [
        "MCU / Toolchain",
        "STM32F411RE Nucleo-64 / C (CMSIS Bare-metal)",
        "HAL 사용하지 않음"
      ],
      [
        "GPIO · Keypad",
        "PA6~PA9 Row 출력, PB4~PB7 Column 입력",
        "4×4 Matrix Scan"
      ],
      [
        "PIR",
        "PD2 EXTI2 Rising Edge",
        "접근 감지 후 Keypad 활성화"
      ],
      [
        "Servo / Buzzer",
        "TIM5 CH1 PWM / TIM3 CH3 PWM",
        "도어 구동·인증음"
      ],
      [
        "Display",
        "I2C2 · PCF8574 LCD Backpack",
        "4-bit LCD 전송"
      ],
      [
        "UART Debug",
        "115200 bps, PA2/PA3",
        "상태 확인"
      ]
    ],
    "implementation": [
      {
        "title": "CMSIS Register 직접 제어",
        "items": [
          "RCC·GPIO·SYSCFG·EXTI·NVIC·TIM·I2C Register를 HAL 추상화 없이 초기화하고 주변장치를 제어했습니다.",
          "EXTI2 Rising Edge를 PIR 감지 Event로 사용하고 TIM5/3 PWM은 서보모터 구동과 부저 출력에 연결했습니다.",
          "PCF8574 LCD Backpack을 I2C Register와 4bit LCD 전송 방식으로 구동했습니다."
        ]
      },
      {
        "title": "Key Matrix FSM / 비밀번호 인증",
        "items": [
          "IDLE→SET_ROW→READ_ROW→KEY_RELEASE FSM으로 GPIO Row 출력과 Column Sampling을 서로 다른 상태에서 수행합니다.",
          "4자리 비밀번호를 입력한 후 비교하고 정상 인증 시 Servo Open과 LCD·Buzzer 출력을 실행합니다.",
          "성공 직후 비밀번호 변경, 입력 취소, 실패 후 재입력 등 Application 상태를 구성했습니다."
        ]
      },
      {
        "title": "입력 조건과 출력 분리",
        "items": [
          "PIR을 감지하지 않은 동안 Keypad 입력을 무시하고 감지 후 인증 흐름을 시작합니다.",
          "연속회전형 Servo는 위치 제어가 아닌 PWM·구동 시간으로 문을 여닫습니다.",
          "LCD는 상태가 바뀔 때만 갱신해 불필요한 I2C Blocking을 줄였습니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "Key 1회 입력이 중복 인식",
        "cause": "GPIO Row 출력 직후 Column 값을 즉시 읽어 신호 안정화 전/후 상태가 한 스캔에서 섞였습니다.",
        "action": "Blocking Delay 대신 SET_ROW와 READ_ROW를 분리한 FSM으로 서로 다른 Loop 호출에서 Write/Sample을 수행했습니다.",
        "result": "동일 Key의 중복 입력이 재현되지 않도록 수정하고 실보드에서 확인했습니다."
      },
      {
        "issue": "KEY_RELEASE State가 덮어써짐",
        "cause": "입력 감지 후 KEY_RELEASE를 저장해도 반복문 뒤에 있는 무조건 State 대입이 값을 덮어썼습니다.",
        "action": "Key 감지 여부에 따른 조건부 분기로 State Update를 제한했습니다.",
        "result": "Key 검출 시 즉시 KEY_RELEASE로 전이하고 미검출 시에만 다음 Row를 탐색합니다."
      }
    ],
    "checks": [
      [
        "PIR 감지",
        "미감지 상태 Keypad 무반응 / 감지 후 Keypad 활성화",
        "STM32F411RE 실보드"
      ],
      [
        "4자리 인증",
        "성공→Servo Open/LCD, 실패→Buzzer·Try Again",
        "실보드 PASS"
      ],
      [
        "입력 상태",
        "취소 D / 성공 후 비밀번호 변경 / 중복 Key 방지",
        "실보드 PASS"
      ],
      [
        "주변장치 연동",
        "CMSIS EXTI·GPIO·TIM·I2C, I2C LCD 출력",
        "HAL 미사용"
      ]
    ],
    "scope": "교육 프로젝트이며 회사 Firmware 실무가 아닙니다. 실보드 MCU는 STM32F411RE입니다. HAL API 비교가 아니라 CMSIS Register 직접 제어한 Bare-metal 구현입니다.",
    "source": "https://app.notion.com/p/323e0998268983ab8d8b011904c550a6",
    "github": "https://github.com/ichanmi1009/STM32-SmartDoorLock",
    "metrics": [
      {
        "value": "CMSIS",
        "label": "HAL 미사용",
        "detail": "STM32F411RE"
      },
      {
        "value": "4×4",
        "label": "Key Matrix",
        "detail": "비블로킹 Scan FSM"
      },
      {
        "value": "PASS",
        "label": "실보드 인증",
        "detail": "PIR·Servo·LCD"
      }
    ]
  },
  "rv32i-cpu": {
    "focus": "RV32I Single-Cycle CPU의 37개 명령을 구현하고 RISC-V GCC로 변환한 C 1~10 누적합 프로그램에서 sum=55, 완료 표시 0x12345678까지 확인했습니다.",
    "spec": [
      [
        "ISA / RTL",
        "RV32I 37 Instruction",
        "R10 · I9 · Load5 · S3 · B6 · U2 · J/JALR2"
      ],
      [
        "CPU 구조",
        "Single-Cycle · 32×32 Register File",
        "PC/Instruction/ALU/Memory/Control"
      ],
      [
        "최종 누적합",
        "sum=55 → data_ram[58]",
        "Byte Address 232"
      ],
      [
        "완료 값",
        "0x12345678 → data_ram[59]",
        "Halt Loop 확인"
      ]
    ],
    "implementation": [
      {
        "title": "Datapath · Control Unit",
        "items": [
          "PC·Instruction Memory·Register File·Immediate Generator·ALU·Data Memory·Writeback을 Single-Cycle 구조로 구성했습니다.",
          "Opcode/funct3/funct7을 해독해 ALU Control·RegWrite·MemWrite·Branch/Jump·Writeback 선택 신호를 생성했습니다.",
          "Load Byte/Half/Word의 Sign/Zero Extend와 Store Byte/Half/Word, Signed/Unsigned Branch를 구분합니다."
        ]
      },
      {
        "title": "Instruction별 RTL 검증",
        "items": [
          "R/I-Type의 Arithmetic/Logic/Shift와 Store/Load/Branch/JALR의 Control·PC·Memory 경로를 Simulation으로 확인했습니다.",
          "SLT/SLTU, SRL/SRA와 같은 Signed/Unsigned·Shift 차이를 테스트 데이터로 분리했습니다.",
          "R-Type·Store·JALR의 실 파형을 상세 페이지에 연결했습니다."
        ]
      },
      {
        "title": "C → GCC → Instruction Memory → CPU",
        "items": [
          "1~10 누적합 C 프로그램을 RISC-V GCC로 컴파일해 Instruction Memory에 배치했습니다.",
          "JAL/JALR 호출·복귀를 거쳐 data_ram[58]에 55, data_ram[59]에 완료 표시값 0x12345678을 저장했습니다.",
          "최종 동일 PC를 반복하는 Halt Loop를 확인했습니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "Store Width 차이가 파형에서 구분되지 않음",
        "cause": "초기 Memory 값의 하위 Byte가 반복되어 SW/SH/SB를 수행해도 파형상 차이가 명확하지 않았습니다.",
        "action": "SW·SH·SB가 각각 다른 Address와 구분되는 입력 Data를 사용하도록 Testbench를 변경했습니다.",
        "result": "SW 0x55AACC11, SH 0x0000CC11, SB 0x00000011 저장 결과를 분리 확인했습니다."
      }
    ],
    "checks": [
      [
        "37 Instruction",
        "R/I/Load/S/B/U/J/JALR 계열별 Data/Control Simulation",
        "RTL Test"
      ],
      [
        "GCC 통합 검증",
        "1~10 반복 누적합 sum=55 / address 232",
        "C→Assembly→CPU"
      ],
      [
        "완료 조건",
        "data_ram[59]=0x12345678, Halt Loop",
        "프로그램 실행"
      ],
      [
        "JAL/JALR",
        "함수 호출 return address 및 간접 복귀",
        "파형"
      ]
    ],
    "scope": "RV32I 37명령 Single-Cycle 구현이며 Pipeline·Cache·전체 ISA 확장은 구현 범위가 아닙니다.",
    "source": "https://app.notion.com/p/caae0998268982029a8281b6886daa8b",
    "github": "https://github.com/ichanmi1009/RV32I_singlecycle",
    "metrics": [
      {
        "value": "37",
        "label": "RV32I 명령어",
        "detail": "Single-Cycle"
      },
      {
        "value": "55",
        "label": "C 누적합 결과",
        "detail": "1~10 합산"
      },
      {
        "value": "0x12345678",
        "label": "완료 표시",
        "detail": "data_ram[59]"
      }
    ]
  },
  "uart-fifo-uvm": {
    "focus": "SystemVerilog Class·Mailbox·Event로 UART와 FIFO의 자동검증 환경을 구성했습니다. DUT 전송 완료와 Testbench 다음 자극 시점을 분리하고, FIFO 데이터 순서를 Scoreboard Queue로 비교했습니다.",
    "spec": [
      [
        "검증 프레임워크",
        "SystemVerilog Class-based",
        "UVM Framework와 구분"
      ],
      [
        "Testbench",
        "Transaction / Generator / Driver / Monitor / Scoreboard",
        "Mailbox + Event"
      ],
      [
        "UART",
        "RX Random 500 PASS / TX Random 500 PASS",
        "FAIL 0"
      ],
      [
        "FIFO",
        "Random Push/Pop 500 Trial → Pop 344 비교 PASS",
        "16Byte FIFO Full/Pop"
      ],
      [
        "Loopback",
        "UART RX→FIFO→UART TX 500 PASS",
        "Byte Sequence/Boundary"
      ]
    ],
    "implementation": [
      {
        "title": "Transaction · Generator · Driver",
        "items": [
          "Class Transaction으로 Random Byte와 제어 값을 관리하고 Mailbox로 Driver·Scoreboard에 입력 조건을 전달했습니다.",
          "UART RX는 Random Byte를 8N1 Serial Frame으로 구동하고, UART TX는 Parallel Data와 tx_start를 인가했습니다.",
          "Monitor의 Event가 한 Transaction 종료를 알린 뒤 다음 입력을 발생시켜 테스트 시점 중첩을 방지했습니다."
        ]
      },
      {
        "title": "UART/FIFO Monitor · Scoreboard",
        "items": [
          "RX의 rx_done 이후 복원 Data와 TX Serial을 Monitor가 복원한 Byte를 기준으로 Expected/Actual을 비교했습니다.",
          "FIFO Push Data를 Scoreboard Queue에 저장하고 Pop에서 선두 Data와 실제 pop_data를 비교했습니다.",
          "FIFO Random 500개 Transaction 중 실제 Pop이 발생한 344개만 비교 PASS로 산정했습니다."
        ]
      },
      {
        "title": "Unit → Integration Regression",
        "items": [
          "UART RX/TX 각 500 Test, FIFO Random, RX+FIFO 16Byte Full/Pop, UART+FIFO End-to-End Loopback을 검증했습니다.",
          "0x00·0x55·0xAA·0xFF Boundary Pattern과 순차 1~16 Test를 추가했습니다.",
          "실제 UART/FIFO/Loopback 파형과 Scoreboard 출력은 연결된 프로젝트 GitHub에서 확대 확인할 수 있습니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "두 번째 UART TX Test부터 멈춤",
        "cause": "tx_busy가 아직 Active일 때 다음 tx_start가 구동돼 DUT가 요청을 무시했고 Monitor는 전송 완료를 무한 대기했습니다.",
        "action": "Driver에서 tx_busy 해제를 확인한 후에만 다음 tx_start를 발생시키도록 수정했습니다.",
        "result": "TX Random 500개 Transaction 연속 PASS를 확인했습니다."
      },
      {
        "issue": "Driver와 DUT 동일 Clock Edge Race",
        "cause": "Driver가 DUT와 같은 Posedge에서 값을 바꿔 Simulation Scheduling 순서에 따라 값 관측 결과가 달라질 수 있었습니다.",
        "action": "Driver 구동을 상승 Edge 이후로, Monitor Data Sampling을 하강 Edge로 분리했습니다.",
        "result": "구동·관찰 타이밍을 분리해 Race 가능성을 줄였습니다."
      }
    ],
    "checks": [
      [
        "UART RX/TX",
        "RX 500 PASS / TX 500 PASS",
        "Class-based Scoreboard"
      ],
      [
        "FIFO Random",
        "500 Trial · 344 Actual Pop Comparison PASS",
        "Queue Data Order"
      ],
      [
        "UART RX + FIFO RX",
        "16 Byte 저장 / Full / Pop",
        "Depth 16"
      ],
      [
        "UART+FIFO Loopback",
        "500 PASS / FAIL 0",
        "End-to-End"
      ],
      [
        "Boundary",
        "0x00·0x55·0xAA·0xFF",
        "Sequence Test"
      ]
    ],
    "scope": "UVM 1.2를 적용한 SPI·I2C 별도 프로젝트와 다르게 SystemVerilog Class 기반 검증입니다. FIFO 344 PASS는 Random 500회 중 실제 Pop 비교가 수행된 회수입니다.",
    "source": "https://app.notion.com/p/8a7e099826898201be420132330326a9",
    "github": "https://github.com/ichanmi1009/SystemVerilog_Verification",
    "metrics": [
      {
        "value": "500",
        "label": "UART RX PASS",
        "detail": "TX도 500 PASS"
      },
      {
        "value": "344",
        "label": "FIFO Pop 비교",
        "detail": "500 Random Trial"
      },
      {
        "value": "500",
        "label": "Loopback PASS",
        "detail": "FAIL 0"
      }
    ]
  },
  "uart-fifo-sensor": {
    "focus": "3인 팀 통합 프로젝트에서 DHT11 40-bit 수신 RTL과 Mode별 FND Controller를 구현했습니다. Sensor 수신 중 Display 값이 바뀌지 않도록 Checksum·STOP·Valid·출력 Register 조건을 분리했습니다.",
    "spec": [
      [
        "Platform",
        "Basys 3 / Verilog / ComportMaster",
        "3인 팀 프로젝트"
      ],
      [
        "DHT11",
        "Single-wire Start Low 약 19 ms",
        "40-bit 온습도·Checksum 수신"
      ],
      [
        "유효성",
        "4Byte Sum = Checksum && FSM STOP",
        "Valid Pulse 이후 Display Register 갱신"
      ],
      [
        "FND",
        "1 kHz 4자리 Dynamic Scan",
        "Mode/Decimal Point MUX"
      ],
      [
        "Test Data",
        "0x21001B003C",
        "Humidity 33 · Temperature 27 · Checksum 60"
      ]
    ],
    "implementation": [
      {
        "title": "DHT11 Timing FSM",
        "items": [
          "IDLE→START→WAIT→SYNCL→SYNCH→DATA_SYNC→DATA_COUNT→DATA_DECISION→STOP으로 Single-wire 프로토콜을 구성했습니다.",
          "Bit별 High Pulse Width를 System Clock Count로 측정해 0/1을 구분하고 40bit Shift Register에 누적했습니다.",
          "앞 4Byte 합과 Checksum을 비교하고 STOP 상태에서만 valid를 발생시킵니다."
        ]
      },
      {
        "title": "DHT11 Data / Display Timing 분리",
        "items": [
          "초기 0==0 Checksum 통과 문제를 방지하려고 STOP 완료와 Checksum Compare를 동시에 확인했습니다.",
          "Humidity/Temperature 출력은 수신 중 Shift Register와 직접 연결하지 않고 Valid 완료에서만 갱신합니다.",
          "모듈 출력이 유효하지 않을 때 FND 값이 깜빡이거나 0000으로 잘못 표시되는 문제를 수정했습니다."
        ]
      },
      {
        "title": "FND Controller · 팀 통합",
        "items": [
          "Stopwatch/Watch, DHT11 온습도, HC-SR04 거리를 각 Display 자리수로 분리했습니다.",
          "Mode MUX, 1kHz 4자리 Scan, BCD→7-Segment Decoder 및 Decimal Point를 통합했습니다.",
          "PC의 ASCII 명령은 팀 UART/FIFO/Decoder 경로를 거쳐 Mode를 변경하며 본인 구현 FND Controller에 연동됩니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "첫 Sensor 측정 전에 FND에 0000 표시",
        "cause": "초기 Shift Register와 Checksum이 모두 0이라 0==0으로 간주하고 Data 수신 전 valid가 발생했습니다.",
        "action": "Checksum Match와 FSM STOP 완료를 동시에 만족해야 Valid를 출력하도록 수정했습니다.",
        "result": "40bit 수신 완료 전에는 온습도 출력이 갱신되지 않도록 보장했습니다."
      },
      {
        "issue": "DHT11 수신 도중 FND 깜빡임",
        "cause": "Display 출력이 Serial Shift Register에 직접 연결돼 비트 수신 중마다 표시값이 바뀌었습니다.",
        "action": "Checksum 통과 후에만 갱신되는 온습도 Output Register를 별도로 뒀습니다.",
        "result": "온습도 수신과 표시 경로를 분리해 수신 도중 표시값을 유지했습니다."
      },
      {
        "issue": "Open-drain Testbench에서 일시적인 X",
        "cause": "FPGA Drive Release와 Sensor Testbench Response 구간이 겹쳐 버스 구동 주체가 충돌했습니다.",
        "action": "Open-drain/Pull-up 조건을 고려해 응답 시작 시점과 동기화된 FSM 입력을 구분했습니다.",
        "result": "불안정 구간의 X Propagation을 줄여 시뮬레이션을 확인했습니다."
      }
    ],
    "checks": [
      [
        "DHT11 Start / Receive",
        "Start Low 약 19 ms, 40bit 수신",
        "RTL Simulation"
      ],
      [
        "Valid Data",
        "0x21001B003C → 33/27/60 · valid=1",
        "Checksum PASS"
      ],
      [
        "Checksum Error",
        "valid=0 / 이전 출력 Register 유지",
        "Negative Test"
      ],
      [
        "HC-SR04 팀 통합",
        "Echo 1000 μs → 17.24 cm 확인",
        "Team System"
      ],
      [
        "FND / UART",
        "Basys 3 FND와 PC Terminal에서 측정값 확인",
        "통합 시연"
      ]
    ],
    "scope": "주요 구현 내용은 DHT11 Controller와 FND Controller이며 HC-SR04·UART/FIFO/ASCII Decoder 전체를 개인 구현으로 표현하지 않았습니다.",
    "source": "https://app.notion.com/p/608e099826898246b15281d7d240d36e",
    "github": "https://github.com/ichanmi1009/UART-FIFO-SENSOR-stopwatch_watch",
    "metrics": [
      {
        "value": "40 bit",
        "label": "DHT11 Frame",
        "detail": "Checksum 포함"
      },
      {
        "value": "33 / 27",
        "label": "습도 / 온도",
        "detail": "실제 수신 Test Data"
      },
      {
        "value": "1 kHz",
        "label": "FND Scan",
        "detail": "Mode MUX"
      }
    ]
  },
  "uart-loopback": {
    "focus": "100 MHz FPGA System Clock에서 9600 bps·8N1·16× Oversampling UART RX/TX RTL을 구현하고, 수신 완료 Pulse를 TX Start에 직접 연결하는 Hardware Loopback을 Basys 3 실보드로 확인했습니다.",
    "spec": [
      [
        "Clock",
        "100 MHz",
        "Basys 3"
      ],
      [
        "Baud",
        "9600 bps / 8N1 / LSB First",
        "Start 1, Data 8, Stop 1"
      ],
      [
        "Oversampling",
        "9600×16 = 153.6 kHz",
        "약 651 Clock/Tick"
      ],
      [
        "Synchronization",
        "2-FF RX Input Synchronizer",
        "비동기 RX→System Clock"
      ]
    ],
    "implementation": [
      {
        "title": "UART TX · RX FSM",
        "items": [
          "TX는 IDLE→START→DATA→STOP에서 LSB First 8bit를 전송하고 tx_busy로 중복 요청을 제한했습니다.",
          "RX는 Start Falling Edge 이후 중앙에서 다시 Low를 확인하고 16 Tick 간격으로 Data Bit를 Sampling합니다.",
          "수신 8bit 1Byte 수신 완료 시 rx_done 1Clock Pulse를 생성합니다."
        ]
      },
      {
        "title": "Hardware Loopback",
        "items": [
          "2단 Synchronizer로 비동기 RX가 내부 FSM에 입력되는 Timing을 안정화했습니다.",
          "rx_data → tx_data, rx_done → tx_start로 연결해 Processor나 C Code 없이 즉시 Data를 되돌립니다.",
          "ComportMaster에서 PC→Basys 3→PC Byte가 동일한지 확인했습니다."
        ]
      },
      {
        "title": "비트 타이밍 검증",
        "items": [
          "16× Oversampling Tick과 Start Center Check, Bit Counter·RX Shift Register·TX 출력 파형을 확인했습니다.",
          "UART 8N1 Simulation에서 8'h30 Loopback Pattern과 rx_done/TX Start 연결을 확인했습니다."
        ]
      }
    ],
    "checks": [
      [
        "UART TX Frame",
        "9600bps · 8N1 · LSB First",
        "RTL Simulation"
      ],
      [
        "RX 중앙 Sample",
        "Start Midpoint + 16Tick/Data Bit",
        "RTL Simulation"
      ],
      [
        "Loopback Pattern",
        "8'h30 TX/RX Bit Pattern 일치",
        "Vivado Simulation"
      ],
      [
        "PC–FPGA Loopback",
        "ComportMaster 송·수신 Byte 일치",
        "Basys 3"
      ]
    ],
    "scope": "하드웨어 UART 통신 및 Synchronizer/Bit Timing에 대한 교육 프로젝트입니다. 장시간 BER·오류율 등 실측되지 않은 성능 수치는 주장하지 않았습니다.",
    "github": "https://github.com/ichanmi1009/UART_LOOPBACK",
    "debug": [
      {
        "issue": "RX FSM이 Stop Bit보다 빠르게 STOP State 진입",
        "cause": "Data 중앙 Sampling을 수행하는 FSM State 전이가 실제 Stop Bit 종료보다 앞서 이뤄졌습니다.",
        "action": "STOP 대기 조건을 확장해 RX Line High가 안정된 후 IDLE로 복귀하도록 수정했습니다.",
        "result": "Stop Bit 경계에서 재진입하지 않도록 Timing 여유를 확보했습니다."
      },
      {
        "issue": "RX의 짧은 Low를 Start로 오인",
        "cause": "비동기 입력의 Noise 또는 순간 Low가 Falling Edge 조건만 충족하면 Frame을 잘못 시작할 수 있습니다.",
        "action": "2-FF Synchronizer와 Start 중앙 Low 재확인을 적용했습니다.",
        "result": "Start 검출 후 데이터 수신으로 넘어가는 조건을 강화했습니다."
      }
    ],
    "source": "https://app.notion.com/p/f95e09982689827cad1081cf15360488",
    "metrics": [
      {
        "value": "9600",
        "label": "Baud Rate",
        "detail": "8N1 · LSB First"
      },
      {
        "value": "16×",
        "label": "Oversampling",
        "detail": "중앙 Sample"
      },
      {
        "value": "PASS",
        "label": "실보드 Loopback",
        "detail": "PC↔Basys3"
      }
    ]
  },
  "fpga-stopwatch": {
    "focus": "2인 팀 프로젝트에서 Watch Control/Datapath와 Top Module을 담당했습니다. 4-bit Shift Register로 수정 자릿수를 선택하고, Safety Gate와 Registered Output을 적용한 뒤 Stopwatch와 FND 자원을 통합했습니다.",
    "spec": [
      [
        "Platform",
        "Basys 3 / Verilog",
        "2인 Team"
      ],
      [
        "본인 구현",
        "watch_control_unit · watch_datapath · top_stopwatch_watch",
        "Watch / Integration"
      ],
      [
        "선택 신호",
        "4-bit Rotate 0001→0010→0100→1000",
        "10ms/초/분/시 선택"
      ],
      [
        "Timebase / FND",
        "100 MHz → 100 Hz Time Tick, 1 kHz Scan",
        "10 ms / 4-digit FND"
      ]
    ],
    "implementation": [
      {
        "title": "Watch Datapath / 자리수 선택",
        "items": [
          "4bit Shift Register에서 Time Unit을 순환 선택하고 Up/Down Signal이 선택된 Counter에만 적용되도록 제어했습니다.",
          "10ms·초·분·시 최대값 경계의 Roll-over 및 AM/PM 관련 출력 값을 연결했습니다.",
          "Watch 입력 신호는 Stopwatch 모드와 분리해 관리합니다."
        ]
      },
      {
        "title": "Safety Gate / Registered Output",
        "items": [
          "초기 FSM 기반 버튼 제어에서 전환 Timing으로 입력이 누락되는 문제를 발견했습니다.",
          "수정 Mode Switch에서만 Up/Down Signal을 허용하는 Safety Gate로 단순화했습니다.",
          "조합 출력의 Glitch를 막도록 방향 출력은 System Clock 기준 Register에 저장했습니다."
        ]
      },
      {
        "title": "Top-Level System Integration",
        "items": [
          "Stopwatch·Watch의 msec/second/minute/hour 출력은 Mode MUX를 통해 하나의 FND Controller로 전달합니다.",
          "LED에 Display Mode와 AM/PM 상태를 전달하고 Basys 3 실보드의 시간 설정 및 Mode 전환을 확인했습니다.",
          "Button Debounce·Stopwatch Datapath·FND의 팀 작업 범위를 혼동하지 않았습니다."
        ]
      }
    ],
    "debug": [
      {
        "issue": "Watch 수정 버튼 입력 누락",
        "cause": "단순 입력 Gate 기능에 FSM을 추가하면서 상태 전이와 Button Pulse Timing이 어긋났습니다.",
        "action": "FSM을 제거하고 Mode Switch 기준 Safety Gate로 입력 허용을 제한했습니다.",
        "result": "수정 모드에서 Up/Down이 선택 자릿수에 반영됨을 확인했습니다."
      },
      {
        "issue": "조합 출력 Glitch",
        "cause": "비동기 버튼 변화를 Combinational 출력으로 바로 전달해 Glitch가 발생했습니다.",
        "action": "System Clock에 동기화된 출력 Register를 추가했습니다.",
        "result": "출력 변화 시점을 Register 기준으로 정리했습니다."
      }
    ],
    "checks": [
      [
        "자릿수 선택",
        "0001→0010→0100→1000 순환",
        "Watch Control RTL"
      ],
      [
        "Watch 시간 조정",
        "선택 Counter만 Up/Down 변경",
        "RTL Simulation"
      ],
      [
        "Mode Safety Gate",
        "수정 비활성 입력 차단",
        "RTL Simulation"
      ],
      [
        "Top Module",
        "Stopwatch/Watch FND 공유 · AM/PM LED",
        "Basys 3"
      ]
    ],
    "scope": "2인 팀 프로젝트. 본인 담당은 Watch Control·Datapath 및 Top Integration이며 Stopwatch Datapath를 단독으로 설계했다고 표현하지 않았습니다.",
    "source": "https://app.notion.com/p/ae1e0998268982519873817e261e821c",
    "github": "https://github.com/ichanmi1009/stopwatch-watch",
    "metrics": [
      {
        "value": "4 bit",
        "label": "Watch 자릿수 선택",
        "detail": "0001→0010→0100→1000"
      },
      {
        "value": "100 Hz",
        "label": "Time Tick",
        "detail": "10 ms"
      },
      {
        "value": "PASS",
        "label": "Basys 3 실보드",
        "detail": "Watch/Stopwatch"
      }
    ]
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
  },
  "stm32-keymatrix-pir": {
    "images": [
      {
        "title": "STM32F411RE Smart Door Lock 하드웨어",
        "src": "https://raw.githubusercontent.com/ichanmi1009/STM32-SmartDoorLock/main/docs/images/hardware.jpg",
        "caption": "CMSIS 직접 제어 기반 STM32·Keypad·PIR·Servo 실제 배선 구성"
      },
      {
        "title": "4×4 Key Matrix Layout",
        "src": "https://raw.githubusercontent.com/ichanmi1009/STM32-SmartDoorLock/main/docs/images/keypad_layout.png",
        "caption": "Row/Column Scanning과 Key 배열에 사용한 구성도"
      }
    ]
  }
};
