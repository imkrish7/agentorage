export const iconHelper = (type: string) => {
	const typeList = type.split("/");
	if (typeList[0] === "application") {
		return "document";
	} else {
		return "image";
	}
};
