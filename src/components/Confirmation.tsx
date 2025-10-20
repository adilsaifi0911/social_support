import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import type { DialogProps } from '@toolpad/core/useDialogs';
import { useTranslation } from 'react-i18next';
import type { SituationDescriptionDataType } from '../types/applicationFormDataType';

const Confirmation = ({
	payload: { category, text },
	open,
	onClose,
}: DialogProps<
	{ category: keyof SituationDescriptionDataType; text: string },
	{
		accepted?: boolean;
		rejected?: boolean;
		edited?: boolean;
		category: keyof SituationDescriptionDataType;
		text?: string;
	}
>) => {
	const { t } = useTranslation();
	return (
		<Dialog
			open={open}
			fullWidth
			onClose={() => onClose({ rejected: true, category })}
		>
			<DialogTitle>{t('app.confirmText')}</DialogTitle>
			<DialogContent>{text}</DialogContent>
			<DialogActions>
				<Button
					onClick={() => onClose({ accepted: true, category, text })}
					variant='contained'
					color='success'
				>
					{t('navigation.buttons.accept')}
				</Button>
				<Button
					onClick={() => onClose({ edited: true, category, text })}
					variant='contained'
				>
					{t('navigation.buttons.edit')}
				</Button>
				<Button
					onClick={() => onClose({ rejected: true, category })}
					variant='contained'
					color='error'
				>
					{t('navigation.buttons.reject')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Confirmation;
