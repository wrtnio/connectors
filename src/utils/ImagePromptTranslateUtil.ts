export const generateGptPromptTranslateForImageGenerate = (model: string, text: string) => {
  let content: string;
  if (model === "stable-diffusion-xl-beta-v2-2-2") {
    content = `Write one description about the image based on the given sentence in English. Category is in Human, Animal, Plant, Architecture, Nature and Object.\n###\n[Korean]바람에 날리는 긴 검은 머리카락과 용 비늘 날개를 가진 악한 인간을 아주 복잡하게, 아주 상세하기, 영화느낌, 다크 판타지 느낌으로 클로즈업한 초상화\n[English]very complex hyper-maximalist overdetailed cinematic tribal darkfantasy closeup portrait of a malignant beautiful dragon queen with long black windblown hair and dragon scale wings.Human.\n###\n[Korean]극현실주의, 시네마틱, 옥테인 렌더, 8k 해상도, 아트스테이션, 언리얼 엔진을 사용한 2100년의 대도시\n[English]A grand city in the year 2100, hyper realistic, cinematic, octane render, 8k resolution, artstation, unreal engine.Architecture.\n###\n[Korean]내셔널 지오그래픽 올해의 야생 동물 사진같이, 조명은 어둡게, 피사계 심도, 밤에 뉴욕시에 코를 위로 향하는 코끼리\n[English]Elephant raising its trunk towards the sky, in the darkly lit, New York City night, captured in the style of National Geographic's Wildlife Photographer of the Year.Animal.\n###\n[Korean]"메뉴" 글씨가 깔끔하게 보이는 메뉴를 들고 식당에 앉아있는 여성의 사진\n[English]A photograph of a woman seated in a restaurant, holding a menu with the word "menu" clearly visible.Human.\n###\n[Korean]8k, 서사적 구성, 시네마틱, Octane 렌더링, 아트 스테이션, 언리얼 엔진, 브레스 오브 더 와일드, 나우시카 지브리, 거친 바다와 폭풍\n[English]A cinematic, 8K rendering of a stormy sea and tempest, evocative of the art styles found in the games "Breath of the Wild" and "Nausicaä of the Valley of the Wind," with a narrative composition achieved through the use of Octane rendering, ArtStation, and Unreal Engine.Nature.\n###\n[Korean]숲 중앙에 큰 단풍나무가 서 있고 단풍이 흩날리는 사진 아주 자세하게, 4k로, 그려줘\n[English]Maple tree standing in the center of a forest with leaves falling around it, captured in ultra-detailed 4K resolution.Plant.\n###\n[Korean]${text}\n[English]`;
  } else {
    content = `Write one description about the image based on the given sentence in English.\n###\n[Korean]바람에 날리는 긴 검은 머리카락과 용 비늘 날개를 가진 악한 인간을 아주 복잡하게, 아주 상세하기, 영화느낌, 다크 판타지 느낌으로 클로즈업한 초상화\n[English]very complex hyper-maximalist overdetailed cinematic tribal darkfantasy closeup portrait of a malignant beautiful dragon queen with long black windblown hair and dragon scale wings.Human.\n###\n[Korean]극현실주의, 시네마틱, 옥테인 렌더, 8k 해상도, 아트스테이션, 언리얼 엔진을 사용한 2100년의 대도시\n[English]A grand city in the year 2100, hyper realistic, cinematic, octane render, 8k resolution, artstation, unreal engine.Architecture.\n###\n[Korean]내셔널 지오그래픽 올해의 야생 동물 사진같이, 조명은 어둡게, 피사계 심도, 밤에 뉴욕시에 코를 위로 향하는 코끼리\n[English]Elephant raising its trunk towards the sky, in the darkly lit, New York City night, captured in the style of National Geographic's Wildlife Photographer of the Year.Animal.\n###\n[Korean]"메뉴" 글씨가 깔끔하게 보이는 메뉴를 들고 식당에 앉아있는 여성의 사진\n[English]A photograph of a woman seated in a restaurant, holding a menu with the word "menu" clearly visible.Human.\n###\n[Korean]8k, 서사적 구성, 시네마틱, Octane 렌더링, 아트 스테이션, 언리얼 엔진, 브레스 오브 더 와일드, 나우시카 지브리, 거친 바다와 폭풍\n[English]A cinematic, 8K rendering of a stormy sea and tempest, evocative of the art styles found in the games "Breath of the Wild" and "Nausicaä of the Valley of the Wind," with a narrative composition achieved through the use of Octane rendering, ArtStation, and Unreal Engine.Nature.\n###\n[Korean]숲 중앙에 큰 단풍나무가 서 있고 단풍이 흩날리는 사진 아주 자세하게, 4k로, 그려줘\n[English]Maple tree standing in the center of a forest with leaves falling around it, captured in ultra-detailed 4K resolution.Plant.\n###\n[Korean]${text}\n[English]`;
  }
  return {
    temperature: 0.7,
    model: "gpt-3.5-turbo",
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["###", "##", "\n"],
    messages: [
      {
        role: "user" as const,
        content,
      },
    ],
  };
};
