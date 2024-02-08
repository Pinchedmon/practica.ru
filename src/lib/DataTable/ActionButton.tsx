import { Button } from "@/components/ui/button";

export const ActionButton = ({ onClick }: { onClick: () => void }) => {

    return (
        <Button variant="outline" size="sm" onClick={onClick}>
            Action
        </Button>
    );
};