import typia from "typia";

import CApi from "@wrtn/connector-api";
import { IPrompt } from "@wrtn/connector-api/lib/structures/connector/prompt/IPrompt";

export const test_api_connector_prompt = async (
  connection: CApi.IConnection,
) => {
  const requestBody: IPrompt.IRequest = {
    system_prompt:
      "당신은 보고서 작성을 도와주는 인공지능입니다. 사용자의 요구사항에 맞는 보고서를 작성하세요. 보고서는 Markdown이어야 하며, Markdown 이외의 어떠한 추가적인 설명이나 서술을 포함할 수 없습니다.",
    user_request:
      "성능 측정 보고서를 작성해야 합니다. 보고서 본문에는 반드시 그래프나 차트가 포함되어야 합니다.",
    data: `2024/11/21 14:30:57	
	인텔® 코어™ Ultra 9 프로세서 285K(36M 캐시- 최대 5.70GHz)
	
주요 정보	
제품 콜렉션	Intel® Core™ Ultra Processors (Series 2)
코드 이름	Products formerly Arrow Lake
수직 분야	Desktop
프로세서 번호	285K
전체 최대 TOPS(Int8)	36
고객 권장가격	$589.00-$599.00
	
CPU 사양	
코어 수	24
Performance-core의 수	8
Efficient-core의 수	16
총 스레드 수	24
최대 터보 주파수	5.7 GHz
Intel® Thermal Velocity Boost 주파수	5.7 GHz
인텔® 터보 부스트 맥스 기술 3.0 주파수 ‡	5.6 GHz
Performance-core 최대 터보 주파수	5.5 GHz
Efficient-core 최대 터보 주파수	4.6 GHz
Performance-core 기본 주파수	3.7 GHz
Efficient-core 기본 주파수	3.2 GHz
캐시	36 MB Intel® Smart Cache
총 L2 캐시	40 MB
프로세서 기반 성능	125 W
최대 터보 성능	250 W
인텔® 딥 러닝 부스트	Yes
CPU에서 지원하는 AI 소프트웨어 프레임워크	OpenVINO™ |  WindowsML |  DirectML |  ONNX RT |  WebNN
CPU 리소그래피	TSMC N3B
	
보조 정보	
상태	Launched
출시일	Q4'24
사용 가능한 임베디드 옵션	No
사용 조건	PC/Client/Tablet |  Workstation
데이터시트	지금 보기
	
메모리 사양	
최대 메모리 크기(메모리 유형에 따라 다름)	192 GB
메모리 유형	Up to DDR5 6400 MT/s
최대 메모리 속도	6400 MHz
최대 메모리 채널 수	2
ECC 메모리 지원 ‡	Yes
	
GPU Specifications	
GPU Name‡	Intel® Graphics
그래픽 기본 주파수	300 MHz
그래픽 최대 동적 주파수	2 GHz
GPU 최대 TOPS(Int8)	8
그래픽 출력	DP2.1 UHBR20 |  HDM2.1 FRL 12GHz |  eDP1.4b
Xe-core	4
최대 해상도(HDMI)‡	4K @ 60Hz (HDMI 2.1 TMDS) 8K @ 60Hz (HDMI2.1 FRL)
최대 해상도(DP)‡	8K @ 60Hz
최대 해상도(eDP - 통합 평판)	4K @ 60Hz
DirectX* 지원	12
OpenGL* 지원	4.5
OpenCL* 지원	3
인텔® 퀵 싱크 비디오	Yes
지원되는 디스플레이 수 ‡	4
장치 ID	7D67
GPU의 인텔® 딥 러닝 부스트(인텔® DL 부스트)	Yes
	
NPU 사양	
NPU 이름‡	Intel® AI Boost
NPU 최대 TOPS(Int8)	13
스파시티 지원	Yes
Windows Studio 효과 지원	Yes
NPU에서 지원하는 AI 소프트웨어 프레임워크	OpenVINO™ |  WindowsML |  DirectML |  ONNX RT |  WebNN
	
확장 옵션	
다이렉트 미디어 인터페이스(DMI) 개정	4
최대 DMI 레인의 수	8
인텔® Thunderbolt™ 4	Yes
확장성	1S Only
PCI Express 개정판	5.0 and 4.0
PCI Express 구성 ‡	Up to 1x16+2x4 |  2x8+2x4 | 1x8+4x4
최대 PCI Express 레인 수	24
	
패키지 사양	
소켓 지원	FCLGA1851
열 솔루션 사양	PCG 2020A
최대 작동 온도	105 °C
	
고급 기술	
인텔® Volume Management Device(VMD)	Yes
Intel® Gaussian & Neural Accelerator	3.5
인텔® Thread Director	Yes
Intel® Speed Shift Technology	Yes
인텔® Thermal Velocity Boost	Yes
인텔® 터보 부스트 맥스 기술 3.0 ‡	Yes
인텔® 터보 부스트 기술 ‡	2.0
인텔® 64 ‡	Yes
명령 세트	64-bit
명령 세트 확장	Intel® SSE4.1 |  Intel® SSE4.2 |  Intel® AVX2
유휴 상태	Yes
향상된 인텔 스피드스텝® 기술	Yes
열 모니터링 기술	Yes
	
보안 및 신뢰성	
인텔 vPro® 적격성 ‡	Intel vPro® Enterprise |  Intel vPro® Platform
Intel® Threat Detection Technology(TDT)	Yes
인텔® 액티브 관리 기술(AMT) ‡	Yes
Intel® Standard Manageability (ISM) ‡	Yes
인텔® Remote Platform Erase(RPE) ‡	Yes
인텔® One-Click Recovery ‡	Yes
Intel® Hardware Shield 적격 대상 ‡	Yes
인텔® Control-Flow Enforcement 기술	Yes
인텔® Total Memory Encryption - Multi Key	Yes
Intel® AES New Instructions	Yes
보안 키	Yes
인텔® 신뢰 실행 기술 ‡	Yes
실행 불능 비트 ‡	Yes
인텔® OS 가드	Yes
인텔® 부트 가드	Yes
모드 기반 실행 제어(MBEC)	Yes
인텔® 안정화 이미지 플랫폼 프로그램(SIPP)	Yes
리디렉션 보호 기능이 있는 인텔® 가상화 기술(VT-rp) ‡	Yes
인텔® 가상화 기술(VT-x) ‡	Yes
직접 I/O를 위한 인텔® 가상화 기술(VT-d) ‡	Yes
인텔® VT-x with Extended Page Tables(EPT) ‡	Yes`,
  };
  const output = await CApi.functional.connector.prompt.generate(
    connection,
    requestBody,
  );
  typia.assert<IPrompt.IResponse>(output);
};
